import starDoodleBg from '../../../public/star-doodle-bg.png';
import curveBg from '../../../public/curvePattern.webp'
import scienceDoodleBg from '../../../public/education.webp';

export const NoConversation = () => {
  return (
    <div className="w-full h-full flex justify-center items-center max-sm:hidden" style={{backgroundImage: `url(${scienceDoodleBg.src})`, backgroundSize:'cover'}}>
      <div className='bg-white shadow-2xl p-8 rounded-lg text-center dark:bg-neutral-800'>
        <p>Please, open conversation to start.</p>
        <p>{`If you don\'t have one, use search bar on the left to find other users and have a nice chat!`}</p>
        <p>Always yours, <b>QChat</b> 💙💛</p>
      </div>
    </div>
  );
};
