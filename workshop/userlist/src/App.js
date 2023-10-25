import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { Userlist } from "./components/Userlist";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <section className="card users-container">
         
          <Userlist />
         
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

