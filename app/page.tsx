import Link from 'next/link'; // Make sure to import Link
import Background from './assets/bg-img.webp';
const Page = () => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Background.src})`,
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-7 justify-center h-screen" style={backgroundStyle}>
        <h1 className='text-5xl text-white font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent'>ChatSphere : Connectez-vous Simplement au Monde</h1>
        <p className='text-white text-2xl text-center w-[60%]'>Connectez-vous instantanément avec des amis et collègues à travers le monde, bénéficiant de fonctionnalités intuitives, de personnalisation avancée et d'une sécurité optimale.</p>
        <Link href="/join">       
            <button className="bg-orange-500 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce w-52">
              Join Us
            </button>         
        </Link>
      </div>
    </>
  );
};

export default Page;
