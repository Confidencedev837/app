import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // e.g., 'https://cloud.appwrite.io/v1'
  .setProject('67ee50a1000edc795c2b');

const databases = new Databases(client);
const storage = new Storage(client);

// Replace with your database and collection IDs.
const DATABASE_ID = '67ee54f1000a66030b03';
const PRODUCTS_COLLECTION_ID = '67ee54fb003b923989d7';
const STORAGE_BUCKET_ID = '67ee55c3002f451258a0';
const buyerCollectionId = '67f3a5d9001e4cf6985c';
const commentCollectionId = '67f3a65900269da4de11';

// Uploads an image file to Appwrite Storage and returns the file ID.
export const uploadImage = async (file: File): Promise<string> => {
  const response = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), file);
  return response.$id;
};
export const saveBuyer = async (name: string, email: string, productId: string) => {
  try {
    console.log('Saving buyer...');
    alert('Saving buyer...');
    await databases.createDocument(DATABASE_ID, buyerCollectionId, ID.unique(), {
      name,
      email,
      productId,
    });
    alert('Buyer saved successfully!');
    console.log('Buyer saved successfully!');
  } catch (error) {
    alert('Error: ' + error);
  }
};
export const saveComment = async (
  name: string,
  comment: string,
  timestamp: string,
  productId: string
): Promise<void> => {
  try {
    await databases.createDocument(DATABASE_ID, commentCollectionId, ID.unique(), {
      name,
      comment,
      timestamp,
      productId,
    });
    console.log('Comment saved successfully!');
  } catch (err) {
    console.error('Error saving comment:', err);
  }
};
export const fetchComments = async (productId: string) => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, commentCollectionId, [
      // only fetch comments for this product
      Query.equal('productId', [productId]),
      Query.orderDesc('$createdAt'),
    ]);
    return res.documents;
  } catch (err) {
    console.error('Error fetching comments:', err);
    return [];
  }
};

// Creates a new product document in Appwrite database.
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageIds: string[]; // Array of image file IDs
}

export const createProduct = async (product: Product): Promise<void> => {
  // First, create the document in the products collection.
  // Optionally, you can upload images before saving the document.
  await databases.createDocument(
    DATABASE_ID,
    PRODUCTS_COLLECTION_ID,
    ID.unique(),
    {
      id:ID.unique(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageIds: product.imageIds
    }
  );
};

// filepath: c:\Users\HP\Desktop\mom\app\src\utils\appwriteClients.tsx
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
    return response.documents.map((doc: any) => ({
      id: doc.$id,
      name: doc.name,
      description: doc.description,
      price: doc.price,
      imageIds: doc.imageIds.map((fileId: string) => fileId)
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of failure
  }
};
// Function to get public image URL from Appwrite storage using a file ID.
export const getImageUrl = (fileid: string): string => {
  // Ensure the fileid is just the ID and not a full URL
  return `https://cloud.appwrite.io/v1/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileid}/view?project=67ee50a1000edc795c2b`;
};

