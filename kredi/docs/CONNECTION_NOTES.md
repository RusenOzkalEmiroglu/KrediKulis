# Connection Notes for the Kredi Project

This document provides instructions on how to set up and run the Kredi project successfully.

## Database Connection

- **Service:** Supabase
- **Connection Method:** The application connects to the Supabase database using the `supabase-js` library.
- **Password:** The password for the Supabase database is `Erzincan24.` (including the period at the end).

## Development Server

- **Command:** `npm run dev`
- **Directory:** The command should be run from the `kredi/kredi` directory.
- **Background Process:** To run the server in the background and log the output, use the following PowerShell command:
  ```powershell
  Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev" -NoNewWindow -PassThru -WorkingDirectory "C:\Users\Emreg\OneDrive\Masaüstü\kredi\kredi" > C:\Users\Emreg\.gemini\tmp\output.log 2> C:\Users\Emreg\.gemini\tmp\error.log
  ```

## Common Errors and Solutions

### JSX Syntax Errors

- **Error Messages:** `Expression expected`, `Unexpected eof`, `Expected corresponding JSX closing tag`
- **Cause:** These errors are usually caused by incorrect JSX nesting, missing closing tags, or multiple root elements in a component's `return` statement.
- **Solution:**
  1.  **Single Root Element:** Ensure that every component's `return` statement has a single root element. You can use a `div` or a `React.Fragment` (`<>...</>`) to wrap the content.
  2.  **Correct Nesting:** Carefully check the nesting of your JSX elements to ensure that all tags are properly closed and matched.
  3.  **Conditional Rendering:** When using conditional rendering with `&&`, make sure that the conditionally rendered components are not breaking the JSX structure. It's often safer to place conditional modals and other components outside of the main content `div`.

### `EINVAL: invalid argument, readlink`

- **Cause:** This error is often caused by a corrupted `.next` directory.
- **Solution:** Delete the `.next` directory and restart the development server. You can use the following command in PowerShell:
  ```powershell
  Remove-Item -Recurse -Force .next
  ```
