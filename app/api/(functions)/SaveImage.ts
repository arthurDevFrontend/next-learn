import { NextResponse } from 'next/server';
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";

export class SaveImage {

  private uploadDir: string;

  private relativeDir: string;

  private imagesPath: string[] = [];

  getImagesPath(): string[] {
    return this.imagesPath;
  }

  constructor(private images: Blob[]) {
    
    this.uploadDir = this.createRelativeUploadDir();
    this.relativeDir = this.createPathAndNameFile();

    console.log('Rute donde se almacenaran las imagenes: ', this.uploadDir);
    
    this.images.map((img, index) => {
      const buffer = this.createBuffer(img);
      console.log(`Este es el buffer de la image ${index}: `, buffer);
      
      this.saveimage(buffer, img);
    });
  }

  private async createBuffer(img: Blob) {
    return Buffer.from(await img.arrayBuffer());
  }

  private async saveimage( buffer: any, img: Blob) {
    try {
      await stat(this.uploadDir);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `GalleryImages-${uniqueSuffix}.${mime.getExtension(img.type)}`;
      await writeFile(`${this.relativeDir}/${filename}`, buffer);
      const fileUrl = `${this.uploadDir}/${filename}`;
      console.log(fileUrl);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(this.uploadDir, { recursive: true });
      } else {
        console.error("Error while trying to create directory when uploading a file\n", e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }
  }

  private createPathAndNameFile() { 
    return join(process.cwd(), "public", this.createRelativeUploadDir());
  }

  private createRelativeUploadDir(): string {
    return  `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;
  }  

}