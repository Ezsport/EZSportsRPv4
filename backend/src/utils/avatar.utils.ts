import * as fs from 'fs';
import * as path from 'path';

export class AvatarUtils {
  /**
   * Save base64 image to specified entity folder
   * @param base64 Base64 encoded image string or any falsy value
   * @param entityName Name of the entity (e.g., 'users', 'sports')
   * @param entityId Unique identifier of the entity
   * @returns Path of the saved file or null
   */
  static saveBase64(base64: string | null | undefined | false, entityName: string, entityId: string | number): string | null {
    // If base64 is falsy (null, undefined, empty string, false), delete the image
    if (!base64) {
      this.deleteBase64(entityName, entityId);
      return null;
    }

    // Remove data URL prefix if present
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads', 'avatars', entityName);
    fs.mkdirSync(uploadsDir, { recursive: true });

    // Generate file path
    const filePath = path.join(uploadsDir, `${entityId}.png`);

    // Write file
    try {
      fs.writeFileSync(filePath, base64Data, 'base64');
      return filePath;
    } catch (error) {
      console.error('Error saving base64 file:', error);
      throw new Error(`Failed to save file for ${entityName} with ID ${entityId}`);
    }
  }

  /**
   * Delete base64 image for specified entity
   * @param entityName Name of the entity (e.g., 'users', 'sports')
   * @param entityId Unique identifier of the entity
   */
  static deleteBase64(entityName: string, entityId: string | number): void {
    const filePath = path.join(process.cwd(), 'uploads', 'avatars', entityName, `${entityId}.png`);

    try {
      // Check if file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting base64 file:', error);
      throw new Error(`Failed to delete file for ${entityName} with ID ${entityId}`);
    }
  }

  /**
   * Get base64 image for specified entity
   * @param entityName Name of the entity (e.g., 'users', 'sports')
   * @param entityId Unique identifier of the entity
   * @returns Base64 encoded image string or null if file not found
   */
  static getBase64(entityName: string, entityId: string | number | null | undefined): string | null {
    const filePath = path.join(process.cwd(), 'uploads', 'avatars', entityName, `${entityId}.png`);

    try {
      // Check if file exists
      if (fs.existsSync(filePath)) {
        // Read file and convert to base64
        const fileBuffer = fs.readFileSync(filePath);
        return `data:image/png;base64,${fileBuffer.toString('base64')}`;
      }
      return null;
    } catch (error) {
      console.error('Error reading base64 file:', error);
      throw new Error(`Failed to read file for ${entityName} with ID ${entityId}`);
    }
  }
}
