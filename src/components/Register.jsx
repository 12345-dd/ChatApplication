import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid'
import { TextField, Button, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({mode:"onBlur"});
  const navigate = useNavigate();

  const submitHandler = async(data) => {
    const res = await axios.post("http://localhost:3000/user/user",data);
    console.log(res.status);
    console.log(res.data);
    if(res.status === 201){
        alert("User Registered Successfully");
        navigate("/login");
    }
  };

  const validationSchema = {
    userName:{
        required:{
            value:true,
            message:"User Name is Required *"
        }
    },  
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
        <ChatIcon sx={{ fontSize: 50 ,color: "#ffeb3b"}}/>
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center', mb: 5,color: "#ffeb3b" }}>
            Digital Chat
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5,color:"#d4ff00" }}>
            Share Your Smile with this world and Find Friends
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5 ,color:"#ffcccc"}}>
            Enjoy..!
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
            Registration Form
          </Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
               error={errors.userName}
               fullWidth
               label="User Name"
               variant="outlined"
               {...register('userName', validationSchema.userName)}
               helperText={errors.userName && errors.userName.message}
               sx={{ mb: 2 }}
            />
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
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
