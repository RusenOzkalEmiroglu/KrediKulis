// kredi/app/components/admin/ImageManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Link, GalleryHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ImageManagerProps {
    value: string | null;
    onImageSelect: (url: string) => void;
    bucket: 'bank-logos' | 'card-images' | 'ad-images';
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const ImageManager = ({ value, onImageSelect, bucket }: ImageManagerProps) => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGalleryLoading, setIsGalleryLoading] = useState(false);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    const debouncedUrl = useDebounce(url, 500);

    // Hardcoded main bucket name as per new requirement
    const mainBucketName = 'bank-logos'; 

    const getSubfolderName = (propValue: typeof bucket) => {
        switch (propValue) {
            case 'card-images': return 'cards';
            case 'ad-images': return 'ads';
            case 'bank-logos': return 'logos';
            default: return null; // Return null for unmapped values for debugging
        }
    };

    const subfolder = getSubfolderName(bucket);

    useEffect(() => {
        if (value) {
            setUrl(value);
        }
    }, [value]);

    useEffect(() => {
        if (debouncedUrl && debouncedUrl !== value) {
            onImageSelect(debouncedUrl);
        }
    }, [debouncedUrl, onImageSelect, value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) {
                alert('Resim dosyası 2MB\'dan küçük olmalıdır.');
                return;
            }
            setIsLoading(true);
            try {
                const fileExt = file.name.split('.').pop();
                // Construct the full path within the mainBucketName using the correct subfolder
                const uploadPath = subfolder ? `${subfolder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}` : `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { data, error: uploadError } = await supabase.storage
                    .from(mainBucketName) // Always upload to 'bank-logos'
                    .upload(uploadPath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from(mainBucketName)
                    .getPublicUrl(data.path); // data.path contains the full path within the bucket
                
                onImageSelect(publicUrl);
                fetchGallery(); // Refresh gallery after upload
            } catch (error: any) {
                console.error('Error uploading image:', error);
                alert(`Resim yüklenirken bir hata oluştu: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchGallery = async () => {
        setIsGalleryLoading(true);
        try {
            // Pass the correct subfolder name to the API
            const response = await fetch(`/api/admin/storage/list?subfolder=${subfolder}`);
            if (!response.ok) {
                // Read error message from response body if available
                const errorData = await response.json();
                throw new Error(errorData.error || 'Galeri yüklenemedi.');
            }
            const data = await response.json();
            setGalleryImages(data);
        } catch (error: any) {
            console.error('Error fetching gallery:', error);
            alert(error.message);
        } finally {
            setIsGalleryLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Görsel Yöneticisi</h3>
            <Tabs defaultValue="url">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="url"><Link className="mr-2 h-4 w-4" />URL</TabsTrigger>
                    <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" />Yükle</TabsTrigger>
                    <TabsTrigger value="gallery" onClick={fetchGallery}><GalleryHorizontal className="mr-2 h-4 w-4" />Galeriden Seç</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                    <div className="space-y-4 py-4">
                        <Input
                            type="text"
                            placeholder="https://example.com/image.png"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="upload">
                    <div className="space-y-4 py-4">
                        <Input type="file" onChange={handleFileChange} disabled={isLoading} />
                        {isLoading && <div className="flex items-center space-x-2"><Loader2 className="animate-spin" /><p>Yükleniyor...</p></div>}
                    </div>
                </TabsContent>
                <TabsContent value="gallery">
                    <div className="py-4">
                        {isGalleryLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4 h-64 overflow-y-auto border rounded-md p-2">
                                {galleryImages.length > 0 ? galleryImages.map((image) => (
                                    <div key={image.id} className="cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-md" onClick={() => onImageSelect(image.publicUrl)}>
                                        <img src={image.publicUrl} alt={image.name} className="w-full h-full object-contain rounded-md" />
                                    </div>
                                )) : <p className="col-span-3 text-center text-gray-500">Bu galeride hiç resim yok.</p>}
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
            {value && (
                <div className="mt-4">
                    <p className="text-sm font-medium">Mevcut Görsel:</p>
                    <img src={value} alt="Mevcut Görsel" className="mt-2 h-24 object-contain rounded-md border" />
                </div>
            )}
        </div>
    );
};

export default ImageManager;
