import React, { useState } from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Textarea,
    Button,
    Input,
    Select,
    Navbar as MaterialNavbar,
    Collapse,
    IconButton,
    Option,
} from "@material-tailwind/react";
import axios from 'axios';

import { Link } from 'react-router-dom';

import { MdOutlineAccountCircle } from "react-icons/md";

import { useAuth } from '../hooks/useAuth';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../Firebase';



const Navbar = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    // nav

    const [openNav, setOpenNav] = useState(false);

    const [operAccountDropDown, setOpenAccountDropDown] = useState(false);


    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);



    const { isAuthenticated, loading } = useAuth();


    const [email, setEmail] = useState('');
    const [queryType, setQueryType] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [solution, setSolution] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@gmail\.com$/;
        return regex.test(email);
    };

    const handleSubmit = async () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid Gmail address');
            return;
        }
        setEmailError('');

        if (!queryType || !problemStatement) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/add-feedback`, {
                userEmail: email,
                department: queryType,
                feedbackMessage: problemStatement,
                suggestion: solution
            });
            console.log('Feedback submitted:', response.data);
            handleOpen(); // Close the dialog
            // You might want to show a success message here
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // You might want to show an error message here
        }
    };


    const navList = (
        <ul className="mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link to="/">

                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <p className="flex items-center">
                        Home
                    </p>
                </Typography>
            </Link>


            <Link to="/dashboard">

                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <p className="flex items-center">
                        Dashboard
                    </p>
                </Typography>

            </Link>


            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className={`p-1 font-normal cursor-pointer ${location.pathname !== '/' && ' hidden '}`}
            >
                <p className="flex items-center curpo" onClick={handleOpen}>
                    Feedback
                </p>
            </Typography>

            <Link to="/list-feedbacks">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className={`p-1 font-normal ${location.pathname !== '/dashboard' && ' hidden '}`}
                >
                    <p className="flex items-center">
                        View Feedback
                    </p>
                </Typography>
            </Link>

        </ul>
    );



    return (
        <>
            <div className="bg-white h-[67px] w-[calc(100%)] ">
                <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Link to="/">
                            <Typography
                                as="a"
                                href="#"
                                className="mr-4  cursor-pointer py-1.5 font-bold text-xl"
                            >
                                INFO'DORE
                            </Typography>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="mr-4 hidden lg:block">{navList}</div>
                            <div className="flex items-center gap-x-1">

                                {
                                    isAuthenticated ?
                                        (
                                            <div className=' '>

                                                <span onClick={() => setOpenAccountDropDown(e => !e)}
                                                    className='text-black text-[27px] cursor-pointer '>
                                                    <MdOutlineAccountCircle></MdOutlineAccountCircle>
                                                </span>


                                                {operAccountDropDown &&
                                                    <ul role="menu"
                                                        className="absolute z-10  flex min-w-[180px] flex-col gap-2 right-4 top-16 rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none">
                                                        <button role="menuitem"
                                                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                                                                    fill="#90A4AE"></path>
                                                            </svg>
                                                            <p onClick={() => signOut(getAuth(app))} className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                                Sign Out
                                                            </p>
                                                        </button>
                                                    </ul>}
                                            </div>



                                        )


                                        :
                                        (

                                            <div className='flex items-center justify-center'>

                                                <Link to="/login">
                                                    <Button fullWidth variant="text" size="sm" className="">
                                                        <span>Log In</span>
                                                    </Button>

                                                </Link>

                                                <Link to="/signup">
                                                    <Button fullWidth variant="gradient" size="sm" className="custorm-btn-color">
                                                        <span>Sign UP</span>
                                                    </Button>

                                                </Link>

                                            </div>



                                        )
                                }

                            </div>
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>
                    </div>
                    <Collapse open={openNav}>
                        {navList}
                        <div className="flex items-center gap-x-1">


                            {
                                isAuthenticated ? (<p className='text-black'></p>) :
                                    (

                                        <div>

                                            <Link to="/login">
                                                <Button fullWidth variant="text" size="sm" className="">
                                                    <span>Log In</span>
                                                </Button>

                                            </Link>

                                            <Link to="/signup">
                                                <Button fullWidth variant="gradient" size="sm" className="custorm-btn-color">
                                                    <span>Sign UP</span>
                                                </Button>

                                            </Link>

                                        </div>



                                    )
                            }



                        </div>
                    </Collapse>
                </MaterialNavbar>
                <Dialog open={open} size="xs" handler={handleOpen}>
                    <div className="flex items-center justify-between">
                        <DialogHeader className="flex flex-col items-start">
                            <Typography className="mb-1" variant="h4">
                                Send Feedback
                            </Typography>
                        </DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5 cursor-pointer"
                            onClick={handleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>
                        <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
                            Please fill out the feedback form below.
                        </Typography>
                        <div className="grid gap-6">
                            <div>

                                <Input
                                    type="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError !== ''}
                                    required
                                />
                                {emailError && <Typography color="red">{emailError}</Typography>}
                            </div>
                            <div>

                                <Select
                                    label="Select Query Type"
                                    value={queryType}
                                    onChange={(value) => setQueryType(value)}
                                    required
                                >
                                    <Option value="water-supply">Water Supply</Option>
                                    <Option value="road">Road</Option>
                                    <Option value="vehicle">Vehicle</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </div>
                            <div>

                                <Textarea
                                    label="Describe your problem"
                                    value={problemStatement}
                                    onChange={(e) => setProblemStatement(e.target.value)}
                                    required
                                />
                            </div>
                            <div>

                                <Textarea
                                    label="Your suggestion"
                                    value={solution}
                                    onChange={(e) => setSolution(e.target.value)}

                                />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="text" color="gray" onClick={handleOpen}>
                            Cancel
                        </Button>
                        <Button variant="gradient" color="blue" onClick={handleSubmit}>
                            Submit Feedback
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>

        </>
    )
}

export default Navbar