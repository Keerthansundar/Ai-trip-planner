import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      console.log(user);
      hasLogged.current = true;
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log('Fetched data');
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-20">
      
      <a href='/'>
        <img src="/logo.svg" alt="Logo" className="cursor-pointer" />
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full px-6 py-6">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User"
                  className="cursor-pointer h-[50px] w-[50px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>setOpenDialog(true)}  >Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/logo.svg" alt="Logo" />
                  <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                  <p>Sign in to the app with Google authentication securely</p>
                  <Button
                    className="w-full mt-5 flex gap-4 items-center"
                    onClick={login}
                  >
                    <FcGoogle className="h-7 w-7" /> Sign In
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    </div>
  );
}

export default Header;
