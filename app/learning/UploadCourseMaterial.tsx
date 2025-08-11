import { useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';

function UploadCourseMaterial() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return;

        setUploading(true);
        setError(null);

        const filePath = `materials/${file.name}`;
        const { error } = await supabase.storage.from('course-materials').upload(filePath, file);

        if (error) setError('Failed to upload file');
        else alert('File uploaded successfully');

        setUploading(false);
    };

    return (
        <div>
            <h2>Upload Course Material</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                />
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default UploadCourseMaterial;
