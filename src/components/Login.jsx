import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid'
import { TextField, Button, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({mode:"onBlur"});
  const navigate = useNavigate();

  const submitHandler = async(data) => {
        const res = await axios.post("https://mern24.onrender.com/user/login",data);
        console.log(res.status);
        console.log(res.data);
        if(res.status === 200){
            alert("Login Successfull");
            localStorage.setItem("userName",res.data.data.userName);
            navigate("/chat");
        }
  };

  const validationSchema = {
    email:{
      required:{
        value:true,
        message:"E-mail is Required *"
      }
    },
    password:{
      required:{
        value:true,
        message:"Password is Required *"
      }
    }
  }

  return (
    <Grid container spacing={2} sx={{height:"100vh"}}>

      <Grid item xs={12} md={6} sx={{
        background: 'linear-gradient(to bottom, #00C9FF,rgb(179, 134, 188))',
        backgroundSize: 'cover',
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        color:"#ffffff",
      }}>
        <ChatIcon sx={{ fontSize: 50,color:"#fcd34d" }}/>
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center', mb: 5,color:"#fcd34d" }}>
            Digital Chat
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5,color:"#d4ff00" }}>
            Welcome Back! Sign in to connect with friends
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5 ,color:"#ffc1cc"}}>
            Let’s Stay Connected
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#ffffff'
        }}
      >
        <Grid item xs={12} md={8}
          sx={{
            width: '80%',
            maxWidth: '400px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center', mb: 3 }}>
            Login to Your Account
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              error={errors.email}
              fullWidth
              label="Email"
              variant="outlined"
              {...register('email', validationSchema.email)}
              helperText={errors.email && errors.email.message}
              sx={{ mb: 2 }}
            />
            <TextField
              error={errors.password}
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register('password', validationSchema.password)}
              helperText={errors.password && errors.password.message}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ padding: '10px' }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};