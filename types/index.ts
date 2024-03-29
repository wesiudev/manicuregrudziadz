export type Post = {
  postId: string;
  title: string;
  sections: Section[];
  intro: string;
  outro: string;
  tags: string[];
  url: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  mainImage: string;
  faq: {
    question: string;
    answer: string;
  }[];
  creationTime: number;
};

export type Section = {
  title: string;
  content: any;
  id?: number;
};

export type ImageType = {
  src: string;
  alt: string;
};

/**
 * Struktura Post pozwala na przechowywanie informacji o pojedynczym poście na stronie internetowej.
 * Zawiera identyfikator posta, tytuł, sekcje zawierające nagłówek i treść, wstęp, zakończenie,
 * tagi, adres URL prowadzący do posta oraz metadane SEO takie jak meta-tytuł, meta-opis oraz meta-słowa kluczowe.
 *
 * @property {string} postId - Unikalny identyfikator posta.
 * @property {string} title - Tytuł posta.
 * @property {Section[]} sections - Tablica sekcji zawierających nagłówek i treść.
 * @property {string} intro - Wstęp do posta.
 * @property {string} outro - Zakończenie posta.
 * @property {string[]} tags - Tagi przypisane do posta.
 * @property {string} url - Adres URL prowadzący do tego konkretnego posta.
 * @property {string} metaTitle - Meta-tytuł dla celów SEO (opcjonalny).
 * @property {string} metaDescription - Meta-opis dla celów SEO (opcjonalny).
 * @property {string[]} metaKeywords - Lista meta-słów kluczowych dla celów SEO (opcjonalna).
 */

/**
 * Struktura Post pozwala na przechowywanie informacji o pojedynczym poście na stronie internetowej.
 * Zawiera identyfikator posta, tytuł, sekcje zawierające nagłówek i treść, wstęp, zakończenie,
 * tagi, adres URL prowadzący do posta oraz metadane SEO takie jak meta-tytuł, meta-opis oraz meta-słowa kluczowe.
 *
 * @property {string} postId - Unikalny identyfikator posta.
 * @property {string} title - Tytuł posta.
 * @property {Section[]} sections - Tablica sekcji zawierających nagłówek i treść.
 * @property {string} intro - Wstęp do posta.
 * @property {string} outro - Zakończenie posta.
 * @property {string[]} tags - Tagi przypisane do posta.
 * @property {string} url - Adres URL prowadzący do tego konkretnego posta.
 * @property {string} metaTitle - Meta-tytuł dla celów SEO (opcjonalny).
 * @property {string} metaDescription - Meta-opis dla celów SEO (opcjonalny).
 * @property {string[]} metaKeywords - Lista meta-słów kluczowych dla celów SEO (opcjonalna).
 */
