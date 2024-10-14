import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react"

import { Bible, Chapter, Language, Book } from "./interfaces.tsx";

export function App() {

  function getBibleLanguages(bibles: Bible[]): string[] {
    const bibleLanguages = bibles.map((b: Bible) => b.language.nameLocal)
    const bibleUniqueLanguages = [...new Set(bibleLanguages)]
    bibleUniqueLanguages.sort((a: string, b: string) => a.localeCompare(b))
    return bibleUniqueLanguages;
  }

  const [bibles, setBibles] = useState<Bible[]>([])
  
  const [languages, setLanguages] = useState(["Loading..."]);
  const [language, setLanguage] = useState("Loading...");
  const [languageObjects, setLanguageObjects] = useState<Language[]>([]);
  
  const [bibleVersions, setBibleVersions] = useState(["Loading..."]);
  const [bibleVersion, setBibleVersion] = useState("Loading...");

  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState("Loading...");

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapter, setChapter] = useState("Loading...");

  const [chapterText, setChapterText] = useState<any>({});


  useEffect(() => {

    const fetchData = async () => {

      const data = await fetch('https://api.scripture.api.bible/v1/bibles', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'api-key': '03f662736d5181f8892025903c520951'
        }
      });
      const json = await data.json()
      const bibles = json.data
      setBibles(bibles)
      const languageObjects = bibles.map((b:Bible) => b.language)
      setLanguageObjects(languageObjects)
      const languages = getBibleLanguages(bibles)
      setLanguages(languages)

    }

    fetchData()
      .catch(console.error);
  }, [])


  useEffect(() => {

    const languageId = languageObjects.find((l: Language) => l.nameLocal == language)?.id
    const biblesFiltered = bibles.filter(b => b.language.id == languageId)
    const bibleVersions = biblesFiltered.map((b: Bible) => b.name)
    const bibleUniqueVersions: any = [...new Set(bibleVersions)]

    setBibleVersions(bibleUniqueVersions)

  }, [language])

  useEffect(() => {
    const bible = bibles.find((b: Bible) => b.name == bibleVersion)
    const bibleId = bible?.id;

    if(bibleId) {

      const fetchData = async () => {

        const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'api-key': '03f662736d5181f8892025903c520951'
          }
        });
        const json = await data.json()
        setBooks(json.data)
      }

      fetchData()
        .catch(console.error);

    }

  }, [bibleVersion])

  useEffect(() => {

    const bible = bibles.find((b: Bible) => b.name == bibleVersion)
    const bibleId = bible?.id;
    const bookId = books.find((b: Book) => b.name == book)?.id

    if(bibleId && bookId) {

      const fetchData = async () => {

        const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'api-key': '03f662736d5181f8892025903c520951'
          }
        });
        const json = await data.json()
        setChapters(json.data)
      }

      fetchData()
        .catch(console.error);
    }

  }, [book])


  useEffect(() => {

    const bible = bibles.find((b: Bible) => b.name == bibleVersion)
    const bibleId = bible?.id;
    const chapterId = chapters.find((c: Chapter) => c.number == chapter)?.id

    if(bibleId && chapterId) {

      const fetchData = async () => {

        const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'api-key': '03f662736d5181f8892025903c520951'
          }
        });
        const json = await data.json()
        console.log(json, json.data)
        setChapterText(json.data)
      }

      fetchData()
        .catch(console.error);
    }

  }, [chapter])


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold"> Universal Bible </h1>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Select onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Array.from({ length: languages.length }, (_, i) => (
                  <SelectItem key={i} value={languages[i]}>{languages[i]}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select disabled={ language == "Loading..." ? true : false} onValueChange={setBibleVersion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Version</SelectLabel>
                {Array.from({ length: bibleVersions.length }, (_, i) => (
                  <SelectItem key={i} value={bibleVersions[i]}>{bibleVersions[i]}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select disabled={ bibleVersion == "Loading..." ? true : false} onValueChange={setBook}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Book</SelectLabel>
                {Array.from({ length: books.length }, (_, i) => (
                  <SelectItem key={i} value={books[i].name}>{books[i].name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select disabled={ book == "Loading..." ? true : false } onValueChange={setChapter} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chapter</SelectLabel>
                {Array.from({ length: chapters.length }, (_, i) => (
                  <SelectItem key={i} value={chapters[i].number}>{chapters[i].number}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select disabled={ chapter == "Loading..." ? true : false}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a versicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Versicle</SelectLabel>
                <SelectItem value="apple">1</SelectItem>
                <SelectItem value="banana">2</SelectItem>
                <SelectItem value="blueberry">3</SelectItem>
                <SelectItem value="grapes">4</SelectItem>
                <SelectItem value="pineapple">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
        </div>

      </div>

      <div className="border rounded-lg p-2">
        
        { <div dangerouslySetInnerHTML={{ __html: chapterText.content }} /> }

      </div>
    </div>
  )
}

export default App
