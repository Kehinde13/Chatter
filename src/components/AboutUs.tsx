import AboutIMG from '../assets/AboutImg.png'

function AboutUs() {
  return (
    <div className='md:flex justify-between mx-10 md:mt-20'>
      <div className='md:w-[50%]'>
        <h1 className='text-2xl md:text-4xl font-bold mt-5'>About Chatter</h1>
        <p className='md:w-[80%] my-10'>
          Chatter is a multi-functional platform where authors and readers can
          have access to their own content. It aims to be a traditional
          bookworm’s heaven and a blog to get access to more text based content.
          Our vision is to foster an inclusive and vibrant community where
          diversity is celebrated. We encourage open-mindedness and respect for
          all individuals, regardless of their backgrounds or beliefs. By
          promoting dialogue and understanding, we strive
        </p>
      </div>
      <div>
        <img src={AboutIMG} alt="about image" />
      </div>
    </div>
  );
}

export default AboutUs;
