import { Button } from "./components/ui/button"
import { Search } from 'lucide-react'
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

export function App() {

  /* function sortVersionsByLanguage(bibleVersionList) {
    let sortedVersions = {};
    for (const version of bibleVersionList) {
      if (!sortedVersions[version.language]) {
        sortedVersions[version.language] = [];
      }
      sortedVersions[version.language].push(version);
    }
    for (const version in sortedVersions) {
      sortedVersions[version].sort((a, b) => {
        const nameA = a.abbreviation.toUpperCase();
        const nameB = b.abbreviation.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    return sortedVersions;
  }

  const [bibleVersionList, setBibleVersionList] = useState([]); */
  
  const [names, setNames] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch('https://fake-json-api.mock.beeceptor.com/users');
      const json = await data.json()
      const names = json.map((u: any) => u.name)
      setNames(names)
    }

    fetchData()
      .catch(console.error).finally(() => console.log(names));
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold"> Universal Bible </h1>

      <div className="flex items-center justify-between">

        <form className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Array.from({ length: names.length }, (_, i) => (
                  <SelectItem value={names[i]}>{names[i]}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Version</SelectLabel>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="korean">Korean</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Book</SelectLabel>
                <SelectItem value="jeremiah">Jeremiah</SelectItem>
                <SelectItem value="isaiah">Isaiah</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="psalms">Psalms</SelectItem>
                <SelectItem value="matthew">Matthew</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a chapter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chapter</SelectLabel>
                <SelectItem value="apple">1</SelectItem>
                <SelectItem value="banana">2</SelectItem>
                <SelectItem value="blueberry">3</SelectItem>
                <SelectItem value="grapes">4</SelectItem>
                <SelectItem value="pineapple">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
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
          
        </form>

        <Button type="submit" variant="link">
            <Search className="w-4 h-4 mr-2"/>
            Search
        </Button>

      </div>

      <div className="border rounded-lg p-2">
        
        A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado
        na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real.

      </div>
    </div>
  )
}

export default App
