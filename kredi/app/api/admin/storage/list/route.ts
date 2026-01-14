// kredi/app/api/admin/storage/list/route.ts
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const supabase = supabaseAdmin; // Use the new admin client
    const subfolderParam = request.nextUrl.searchParams.get('subfolder');

    const mainBucket = 'bank-logos'; // Hardcoded main bucket


    // Determine the base path for listing (e.g., 'ads', 'cards', 'logos', or empty for root of mainBucket)
    const basePath = subfolderParam || '';

    const listAllFiles = async (currentRelativePath: string = '') => {
        const pathToList = currentRelativePath ? `${basePath}/${currentRelativePath}` : basePath;

        const { data, error } = await supabase.storage.from(mainBucket).list(pathToList, {
            limit: 1000,
            // no search or offset for now
        });

        if (error) {
            console.error(`Supabase list error in ${mainBucket}/${pathToList}:`, error.message);
            throw new Error(`Failed to list files: ${error.message}`);
        }

        let files: any[] = [];
        for (const fileOrFolder of (data || [])) {
            // Supabase list returns objects without 'id' for folders.
            // Check if it's a file by 'id' presence, or by not ending with '/'
            if (fileOrFolder.id) { // It's a file
                files.push({
                    ...fileOrFolder,
                    // The full path needed for getPublicUrl (relative to bucket root)
                    fullPath: currentRelativePath ? `${basePath}/${currentRelativePath}/${fileOrFolder.name}` : `${basePath}/${fileOrFolder.name}`
                });
            } else { // It's a folder, recurse
                const nextRelativePath = currentRelativePath ? `${currentRelativePath}/${fileOrFolder.name}` : fileOrFolder.name;
                const subFiles = await listAllFiles(nextRelativePath);
                files = files.concat(subFiles);
            }
        }
        return files;
    };

    try {
        const allFiles = await listAllFiles(); // Initial call without relative path

        const filesWithUrls = allFiles.map((file: any) => {
            const { data: { publicUrl } } = supabase.storage.from(mainBucket).getPublicUrl(file.fullPath);
            return {
                id: file.id,
                name: file.name,
                publicUrl: publicUrl
            };
        });

        return NextResponse.json(filesWithUrls);

    } catch (e: any) {
        console.error('Error fetching gallery files:', e);
        return NextResponse.json({ error: `Failed to process gallery. ${e.message}` }, { status: 500 });
    }
}