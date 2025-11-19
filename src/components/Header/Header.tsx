import Navbar from '@components/Navbar/Navbar';
import Logo from '../Logo/Logo';

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b">
      <Logo />
      <Navbar />
    </header>
  );
}
