import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function App() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState<string>(""); // State for search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://digimon-api.vercel.app/api/digimon"
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        } else {
          console.error(
            `Error fetching data: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on the search input
  const filteredData = data
    ? data.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="p-2">
      <h1 className="font-bold text-lg mb-2">Digimon</h1>
      <input
        name="search"
        className="border mb-2"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Digimon"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-6">
        {filteredData.map((item: any) => (
          <div key={item.id}>
            <AlertDialog>
              <AlertDialogTrigger className="border m-1 p-1">
                {item.name}
              </AlertDialogTrigger>
              <AlertDialogContent className="flex gap-2 flex-wrap justify-between">
                <AlertDialogHeader>
                  <AlertDialogTitle>{item.name}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {item.level}
                    {item.img && <img src={item.img} alt={item.name} />}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
