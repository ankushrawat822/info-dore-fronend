import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import {Link} from 'react-router-dom'
const Cards = ({description , img , title }) => {
  return (
     <>
     <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
         className="h-full w-full"
          src={img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
       <Link to="/dashboard">
       <Button color="blue">Discover</Button>
       </Link>
        
      </CardFooter>
    </Card>
     </>
  )
}

export default Cards