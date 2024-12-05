import { ViewTC } from '@/components/trackcode/index'
import { HeaderTC } from '@/components/trackcode/index';

const isLoggedIn = true;
const username = "Juan Pérez";

export default function TrackCode(){
    return(
        <>
        <HeaderTC isLoggedIn={false} username={username}/>
        <div className='p-8 h-screen'>
        <ViewTC/>
        </div>
        </>
    );
}