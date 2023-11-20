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
    <div className="p-4 bg-black text-white min-h-screen text-center mx-auto flex flex-col items-center">
      <h1 className="font-bold text-lg mb-2">Digimon</h1>
      <input
        name="search"
        className="border mb-4 text-black p-1"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Digimon"
      />
      <div className="flex flex-wrap gap-4 justify-center mx-auto">
        {filteredData.map((item: any) => (
          <div key={item.id}>
            <AlertDialog>
              <AlertDialogTrigger className="p-4 w-60 bg-slate-700">
                <p className="mb-4">{item.name}</p>
                <img className="" src={item.img} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="mx-auto text-xl">
                    {item.name}{" "}
                    <span className="text-sm font-normal">({item.level})</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mx-auto">
                    {item.img && (
                      <img width={2000} src={item.img} alt={item.name} />
                    )}
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
