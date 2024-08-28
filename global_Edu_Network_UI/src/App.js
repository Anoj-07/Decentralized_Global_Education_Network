import "./App.css";
import AddInstitution from "./components/AddInstitution";
import CreatePartnership from "./components/CreatePartnership";
import DeactivateInstitution from "./components/DeactiveInstitution";
import DeactivatePartnership from "./components/DeactivePartnership";
import IssueCredential from "./components/IssueCredential";

function App() {
  return (
  
      <div>
        <h1 className='text-center text-lg font-bold bg-black mb-5 p-5 text-white'>Global Education Network</h1>
        <AddInstitution />
        <DeactivateInstitution />
        <CreatePartnership />
        <DeactivatePartnership />
        <IssueCredential />
      </div>
    
  );
}

export default App;
