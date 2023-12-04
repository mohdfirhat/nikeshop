import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <footer className="footer flex justify-around items-center p-4 bg-neutral text-neutral-content shadow-inner">
      <aside className="items-center grid-flow-col">
        <img
          className="h-14 mix-blend-multiply"
          src="/src/assets/nike_logo.jpeg"
          alt="nike logo"
        />
        <p>Nike | Just Do It</p>
      </aside>
      <div>
        <p>A Full-Stack Project By :</p>
        <p className="m-auto">Mohd Firhat</p>
        <nav className="w-full flex justify-around">
          <a href="https://github.com/mohdfirhat" target="_blank">
            <GitHub className="m-2" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohd-firhat-8b6bb9166/"
            target="_blank">
            <LinkedIn className="m-2" />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
