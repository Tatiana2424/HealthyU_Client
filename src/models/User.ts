export interface User {
    id: number;
    userName?: string; 
    firstName?: string; 
    lastName?: string; 
    email: string;
    role: string;
    phoneNumber?: string; 
    imageId: number;
    image?: Image; 
  }
  
export interface Image {
    id?: number;
    title?: string;
    alt?: string; 
    url: string;
  }