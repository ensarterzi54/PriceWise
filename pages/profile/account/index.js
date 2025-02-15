import { AuthContext } from '@/contexts/AuthContex'
import React, { useContext, useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { TextField, CircularProgress, Tooltip, Box, Card, Avatar, Button, IconButton } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSnackbar } from 'notistack';
const Account = () => {
  const { user, sendEmail } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null);

  const { enqueueSnackbar } = useSnackbar()
  
  useEffect(() => {
    if (user) {
      setLoading(false)
    }
    console.log(user)
  }, [user])

  if (loading) {
    return <CircularProgress />
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    console.log(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const sendMail = async () => {
    try {
      await sendEmail()
      console.log('Email sent successfully')
      enqueueSnackbar('Şifre sıfırlama mailiniz gönderildi!', { variant: 'info', vertical: 'top', horizontal: 'right' });
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ marginBottom: 2, }}>
        <Card variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f9fafb',
                border: '2px solidrgb(255, 255, 255)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '16px', 
            }}
        >
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <div className="flex flex-col items-center gap-3">
                <Avatar src={image || user?.photoURL} sx={{ width: 150, height: 150 }} />
                
                {/* <input
                  accept="image/*"
                  id="upload-photo"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <div htmlFor="upload-photo" className="flex d-flex justify-content-center align-items-center">
                  <IconButton color="primary" component="span">
                    <PhotoCameraIcon />
                  </IconButton>
                </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <TextField id="outlined-required" label="Adınız" sx={{ width: 300, marginBottom: 4, marginTop: 2 }} size="small" />

              <TextField id="outlined-required" label="Soyadınız" sx={{ width: 300, marginBottom: 4 }} size="small" />

              <div>
                <TextField disabled id="outlined-disabled" label="E-posta" defaultValue={user?.email} sx={{ width: 300 }} size="small" />

                {user?.emailVerified ? (
                  <Tooltip title="Onaylanmış E-posta">
                    <CheckCircleOutlineIcon sx={{ color: 'green', marginTop: 1, marginLeft: 1 }} />
                  </Tooltip>
                ) : (
                  <Tooltip onClick={() => sendMail()} title="E-posta onaylama maili gönder">
                    <IconButton sx={{ marginLeft: 1 }}>
                      <MailOutlineIcon sx={{  color: 'blue' }} />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div classnName="container">
            <div className="row">
                  <div className="col-md-12 d-flex justify-content-end">
                    <Button 
                      variant="contained" 
                      size="medium" 
                      sx={{ 
                        textTransform: "none",
                        marginTop: 5,
                        marginRight: "105px"
                      }}
                    >
                      Değişiklikleri kaydet
                    </Button>
                  </div>
            </div>
          </div>
        </Card> 
      </Box>
    </div>
  )
}

export default Account

Account.getLayout = function getLayout(page) {
  const ProfileLayout = require('../layout').default
  return <ProfileLayout>{page}</ProfileLayout>
}