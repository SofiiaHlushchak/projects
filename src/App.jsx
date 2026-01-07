import NewProject from "./components/NewProject/NewProject";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar />
            <NewProject />
        </main>
    );
}

export default App;
