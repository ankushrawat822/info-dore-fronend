import React from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
  Card,
} from "@material-tailwind/react";
import Img1 from '../assets/image/hero/hero-1.jpg'
import Img2 from '../assets/image/hero/hero-2.jpg'
import Img3 from '../assets/image/hero/hero-3.jpg'

 import DashboardImg from '../assets/image/hero/dashboard-1.png'
 import {Link} from 'react-router-dom'
import './home.css'
import Footer from "../common/Footer";
import Cards from "./Cards";
const Home = () => {
  
  
  return (
    <>

<header className="bg-white p-8">
        <div className="grid mt-5 min-h-[52vh] w-full lg:h-[14rem]  place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
             
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-5xl lg:!text-5xl"
            >
             Efficiently manage  {" "}
              <span className="text-blue-500 leading-snug ">
              assets
              </span>{" "}with our asset management platform for the
              {" "}
              <span className="leading-snug text-blue-500">
              Indore Municipal Corporation
              </span>
              .
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              Now is the time to revolutionize asset management. Be innovative. Stand out
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Link to="/dashboard">
                <Button
                  color="blue"
                  className="w-full px-4 md:w-[12rem]"
                >
                  get started
                </Button>
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </header>

     <div className="flex items-center justify-center w-full rounded-[18px]">
     <img className=" lg:w-[80%] rounded-[18px] border-2 border-blue-400" src={DashboardImg} alt="" />
     </div>
      

      <section className="px-8 pt-10">
      <div className="container mx-auto">
        <div className="mb-14 text-center ">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            Our Features
          </Typography>
          
        </div>
        
      </div>
    </section>

      {/* cards starts */}
      <div className="flex items-center justify-center gap-7 mb-32 ">
      <Cards 
      title="Rajwada Palace"
      description="An iconic historic palace in Indore, showcasing Maratha architectural grandeur"
      img={Img1}
      link="/dashboard"
      
      
       ></Cards>

<Cards
 title="Garbage Vehicle"
      description="An iconic historic palace in Indore, showcasing Maratha architectural grandeur"
      img={Img3}
      link="/dashboard"
      ></Cards>
      

      <Cards
       title="High Court Indore"
      description="An iconic historic palace in Indore, showcasing Maratha architectural grandeur"
      img={Img2}
      link="/dashboard"
      
      ></Cards>

     
      </div>



      <Footer></Footer>

    </>
  )
}

export default Home