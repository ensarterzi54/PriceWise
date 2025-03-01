import React, { useContext } from 'react'
import { Box, Button, IconButton, Typography, Modal as MuiModal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContex';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const Modal = ({ open, handleClose, title, description }) => {
    const { signOutWithGoogle } = useContext(AuthContext)
    return (
        <MuiModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ onClick: (event) => event.stopPropagation() }}
            disableScrollLock={true}
        >
            <Box sx={style}>
                <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <CloseIcon />
                </IconButton>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>

                <div className="mt-3">
                    <Button>
                        <Link href="https://mail.google.com/" target="_blank">Gmail'e git</Link>
                    </Button>
                </div>

                <div>
                    <Button onClick={()=>signOutWithGoogle()}>Çıkış yap</Button>
                </div>
            </Box>
        </MuiModal>
    )
}

export default Modal
