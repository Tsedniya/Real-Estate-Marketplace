import { supabase } from '../supabaseClient';

const uploadToSupabase = async (file) => {
  if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('real')                    // ← your bucket name
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('real')
    .getPublicUrl(fileName);

  return publicUrl;
};
export { uploadToSupabase };