interface Bible {
    id: string;
    dblId: string;
    abbreviation: string;
    abbreviationLocal: string;
    copyright: string;
    language: Language;
    countries: {
      id: string;
      name: string;
      nameLocal: string;
    }[];
    name: string;
    nameLocal: string;
    description: string;
    descriptionLocal: string;
    info: string;
    type: string;
    updatedAt: string;
    relatedDbl: string;
    audioBibles: {
      id: string;
      name: string;
      nameLocal: string;
      description: string;
      descriptionLocal: string;
    }[];
  }
  
  interface Language {
    id: string;
    name: string;
    nameLocal: string;
    script: string;
    scriptDirection: string;
  }
  
  interface Book {
    id: string;
    bibleId: string;
    abbreviation: string;
    name: string;
    nameLong: string;
    chapter?: {
      id: string;
      bibleId: string;
      number: string;
      bookId: string;
      reference: string;
    }[];
  }
  
  interface Chapter {
    id: string;
    bibleId: string;
    number: string;
    bookId: string;
    reference: string;
  }

  export type { Bible, Language, Book, Chapter};