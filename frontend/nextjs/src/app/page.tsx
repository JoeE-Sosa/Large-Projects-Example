import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header>
        <h1>Descripcion General</h1>
        <p>Aplicacion de ejemplo para proyectos grandes</p>
      </header>
      <section>
        <nav>
          <ul className="list-disc flex flex-col gap-y-2 pl-10">
            <li>
              <a href="/user/create">Crear usuario</a>
            </li>
            <li>
              <a>Ver usuarios</a>
            </li>
          </ul>
        </nav>
      </section>
      <footer></footer>
    </main>
  );
}
