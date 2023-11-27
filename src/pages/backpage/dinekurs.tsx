import Link from 'next/link';
import { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '@/lib/firebaseConfig';
import { useRouter } from 'next/router';
import { logout } from '@/auth/firebaseAuth';

export default function DineKurs() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(router);
      console.log("User logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const ÅpneOverlay = () => {
    setShowOverlay(true);
  };

  const LukkOverlay = () => {
    setShowOverlay(false);
  };

  const database = getDatabase(app);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [videoFile, setVideoFile] = useState(null);
  const [extraFile, setExtraFile] = useState(null);

  const [formData, setFormData] = useState({
    tittel: '',
    beskrivelse: '',
    kommenter: '',
    anmelding: '',
    videofil: '',
    ekstrafil: '', 
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData({
      ...formData,
      [name]: value,
      });
  };

  const handleFileChange = (event, setFile) => {
      const file = event.target.files[0];
      if (file) {
          setFile(file);
      }
  };

  const uploadFiles = async () => {
        const storage = getStorage(app);
        let videoFileUrl, extraFileUrl;

        if (videoFile) {
            const videoFileRef = storageRef(storage, `videos/${videoFile.name}`);
            await uploadBytes(videoFileRef, videoFile);
            videoFileUrl = await getDownloadURL(videoFileRef);
            console.log(videoFileUrl)

        }

        if (extraFile) {
            const extraFileRef = storageRef(storage, `extras/${extraFile.name}`);
            await uploadBytes(extraFileRef, extraFile);
            extraFileUrl = await getDownloadURL(extraFileRef);
        }

        return { videoFileUrl, extraFileUrl };
    };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const shouldSubmit = window.confirm("Er du sikker på at du vil publisere kurset?");
      
      if (shouldSubmit) {
          console.log(await uploadFiles())
          const { videoFileUrl, extraFileUrl } = await uploadFiles();
          console.log(videoFileUrl)

          const updatedFormData = {
            ...formData,
            videofil: videoFileUrl,
            ekstrafil: extraFileUrl
          };
          
          const databaseRef = ref(database, 'Kurs');
          LukkOverlay();

  
          push(databaseRef, updatedFormData)
              .then(() => {
                  setIsSubmitted(true);
                  setFormData({
                    tittel: '',
                    beskrivelse: '',
                    kommenter: '',
                    anmelding: '',
                    videofil: '',
                    ekstrafil: '',
                  });
              })
              .catch((error) => {
                  console.error('Error submitting data to database: ', error);
              });
      }
  };

  return (
    <>
      <main className="w-screen h-screen bg-background flex">
        <div className="w-1/5 bg-primary pt-8">
            <Link href="/backpage/konto" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Din Konto</Link>
            <Link href="/backpage/logg" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Logg</Link>
            <Link href="/backpage/dinekurs" className="w-full flex flex-start py-4 pl-4 bg-background font-semibold text-primary">Dine Kurs</Link>
            <Link href="/backpage/liktekurs" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Likte Kurs</Link>
            <div className="h-[24rem]"></div>
            <Link href="/" className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Tilbake</Link>
            <button onClick={handleSubmit} className="w-full flex flex-start py-4 pl-4 hover:bg-background text-background hover:text-primary">Logg ut</button>
        </div>
        <div className="w-4/5 p-2 relative">
          <div className="h-[7rem] w-full flex items-center shadow-md">
            <div className="w-1/2 pl-8">
              <div className="flex bg-background text-2xl font-semibold">Dine kurs</div>
            </div>
            <div className="w-1/2 flex justify-end mr-4">
              <input type="text" className="text-black rounded p-3 flex outline-none items-center border border-primary bg-background" placeholder="Søk..."/>
              <button onClick={ÅpneOverlay} className="ml-8 py-2 w-[10rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">Legg til kurs</button>
            </div>
          </div>
          {showOverlay && (
                  <form className="fixed top-0 right-0 w-4/5 h-screen bg-background z-50 p-4">
                    <div className='flex w-full'>
                      <div className='w-1/3 p-2'>
                          <div className='border border-primary rounded mb-4'>
                              <p className='ml-2 mt-1 text-secondary'>Tittel</p>
                              <input name="tittel" required maxLength={40} value={formData.tittel} onChange={handleInputChange} type="text" className="text-black rounded p-3 flex outline-none items-center bg-background w-full" placeholder="Hvordan lage en video med..."/>
                          </div>
                          <div className='border border-primary rounded'>
                              <p className='ml-2 mt-1 text-secondary'>Beskrivelse</p>
                              <textarea name="beskrivelse" required value={formData.beskrivelse} onChange={handleInputChange} maxLength={600} className="text-black rounded p-3 flex items-center bg-background w-full resize-none outline-none h-[20rem]" placeholder="For å lage videon brukte jeg..."/>
                          </div>
                      </div>
                      <div className='w-2/3 h-[27.7rem] p-2 pt-2'>
                        <div className='flex items-center justify-between ml-8 mb-12'>
                          <p className='text-primary font-semibold'>Skal det være mulig å kommentere på kurset ditt?</p>
                          <input name="kommenter" required value={formData.kommenter} onChange={handleInputChange} type="checkbox" className='w-[2rem] h-[2rem]' />
                        </div>
                        <div className='flex items-center justify-between ml-8 mb-12'>
                          <p className='text-primary font-semibold'>Skal anmelding av kurset være publisert?</p>
                          <input name="anmelding" required value={formData.anmelding} onChange={handleInputChange} type="checkbox" className='w-[2rem] h-[2rem]' />
                        </div>
                        <div className='flex items-center justify-between ml-8 mb-4'>
                          <div className='flex w-1/3 items-center'>
                            <input  type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Sport</p>
                          </div>
                          <div className='flex w-1/3 items-center'>
                            <input type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Spill/Videospill</p>
                          </div>
                          <div className='flex w-1/3 items-center'>
                            <input type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Film/Video</p>
                          </div>
                        </div>
                        <div className='flex items-center ml-8 mb-12'>
                          <div className='flex w-1/3 items-center'>
                            <input type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Skole/Fag</p>
                          </div>
                          <div className='flex w-1/3 items-center'>
                            <input type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Programmering</p>
                          </div>
                          <div className='flex w-1/3 items-center'>
                            <input type="checkbox" className='w-[2rem] h-[2rem] mr-2' />
                            <p className='text-primary font-semibold'>Utforsk</p>
                          </div>
                        </div>
                        <div className='flex items-center justify-between ml-8 mb-12'>
                          <p className='text-primary font-semibold'>Last opp videofilen din her</p>
                          <input type="file" onChange={(e) => handleFileChange(e, setVideoFile)} className='w-44' />
                        </div>
                        <div className='flex items-center justify-between ml-8 mb-12'>
                          <p className='text-primary font-semibold'>Ekstra filer (For eksempel microsoft dokumenter)</p>
                          <input type="file" onChange={(e) => handleFileChange(e, setExtraFile)} className='w-44' />
                        </div>
                      </div>
                    </div>
                    <div className='flex h-[34rem]'>
                      <button onClick={handleSubmit} className="ml-2 mt-56 py-2 w-[10rem] h-[4rem] bg-primary rounded flex justify-center text-background font-semibold items-center hover:border hover:border-primary hover:bg-background hover:text-primary">Legg til kurs</button>
                      <button onClick={LukkOverlay} className="ml-4 mt-56 py-2 w-[10rem] h-[4rem] bg-background rounded flex justify-center text-primary font-semibold items-center border border-primary hover:bg-primary hover:text-background">Kanseler</button>
                    </div>
                </form>)}
            </div>
      </main>
    </>
  );
}
