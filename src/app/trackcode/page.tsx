import { ViewTC } from '@/components/trackcode/index'
import { Header } from '@/components/ui/index';

export default function TrackCode(){
    return(
        <>
        <Header/>
        <div className='p-8 h-screen'>
        <ViewTC/>
        </div>
        </>
    );
}