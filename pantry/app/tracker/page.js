'use client'
import {Camera} from "react-camera-pro"
import {useState, useEffect, useRef} from 'react'
import {firestore} from '@/firebase'
import {Box, Modal, Typography, Stack, TextField, Button, AppBar, Toolbar, Card} from '@mui/material'
import {query, collection, getDocs, setDoc, deleteDoc, getDoc, doc} from 'firebase/firestore'
import { FaCubesStacked } from "react-icons/fa6";



export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState([''])
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [decipheredText, setDecipheredText] = useState('');
  const [itemFilter, setItemFilter] = useState("");
  const [openRecognize, setOpenRecognize] = useState(false);



  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
  
    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1) 
      {
        await deleteDoc(docRef)
      } 
      else 
      {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
  
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists())
    {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }

    else
    {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }
  

  const decipherImage = async (imageUrl) => {
    const response = await fetch('/api/decipherImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl })
    });
    const data = await response.json();
    setDecipheredText(data.content);
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  

  useEffect(() => {
    if(image)
    {
      decipherImage(image)
      // console.log("Image: " + decipheredText)
    }
  }, [image])

  useEffect(() => {
    if(decipheredText)
    { 
      if(decipheredText === "???")
      {
        handleRecognizeOpen();
        console.log("Unknown Item");
        setDecipheredText("");
      }
      else
      {
        console.log("Image: " + decipheredText);
        addItem(decipheredText);
        setDecipheredText("");
      }
    }
  }, [decipheredText])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleCameraOpen = () => setCameraVisible(true)
  const handleCameraClose = () => setCameraVisible(false)

  const handleRecognizeClose = () => setOpenRecognize(false)
  const handleRecognizeOpen = () => setOpenRecognize(true)



  
  return (
    <>
      <Box width="100vw" height="100vh" display="flex"  alignItems="center" gap={2} flexDirection="column">
        <AppBar bgcolor="#EEC643" position="sticky" width="100%">
          <Toolbar bgcolor="#EEC643">
            <FaCubesStacked size={30} style={{marginRight: "5px !important"}}/>
            <Typography variant="h4" component="div" sx={{flexGrow: .35}}>Pantry Tracker</Typography>
            <Stack direction="row" spacing = {2} display="flex" justifyContent="center" alignItems="center" sx={{transform: "translate(10%, 0%)"}}>
              <Button variant=""  href="/"><Typography variant="h5">Home</Typography></Button>
              <Button variant=""  href="/tracker"><Typography variant="h5">Tracker</Typography></Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Modal open={open} onClose={handleClose}>
          <Box position="absolute" top="50%" left="50%" sx={{transform: "translate(-50%, -50%)", borderRadius: 1}} width={400} bgcolor="white" border="1px solid black" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}}/>
              <Button variant="contained" onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              > Add </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal open={openRecognize} onClose={handleRecognizeClose}>
          <Box position="absolute" top="50%" left="50%" sx={{transform: "translate(-50%, -50%)", borderRadius: 1}} width={400} bgcolor="white" border="0.25px solid darkred" boxShadow={24} p={4} display="flex" flexDirection="column" alignItems={"center"} gap={3}>
            <Typography variant="h5" color="darkred" sx={{fontWeight: "bold"}}>
              <Box marginBottom={1} display="flex" flexDirection="column" alignItems={"center"}>
                <img src="errorIcon.png" width={48} height={48}/>
              </Box>
              Invalid Item</Typography>
          </Box>
        </Modal>
        <Box>
          {!cameraVisible && (<>
            
            
            </>)}
          {cameraVisible && (<>
          
            <Box height="330px" width="500px" border= "1px solid black" position="absolute" top="50%" left="50%" sx={{transform:"translate(-50%, -50%)", zIndex: 2, borderRadius: 2, boxShadow: 12}}>
              <Camera ref={camera} aspectRatio={16 / 9}/>
              <Box borderTop="1.5px solid black" bgcolor="#ADD8E6" height={"48.25px"} display="flex" alignItems="center" justifyContent={"center"}>
                <Button variant="" onClick={() => {setImage(camera.current.takePhoto()); handleCameraClose();}}><img src="pictureIcon.png" width={48} height={48} sx={{color: "black"}}/></Button>
              </Box>
            </Box>
            
            {/* <Button variant= "contained" onClick={() => {setImage(camera.current.takePhoto()); handleCameraClose();}}>Use Camera</Button> */}
            
          </>)}
        </Box>
        
        <Card sx={{ border: "1px solid #333", height: "80%", width: "80%", boxShadow: 5}}>
          <Box width="100%" height="100px" bgcolor="#ADD8E6" alignItems="center" display="flex"  justifyContent="space-between" padding={2}>
            <Typography variant="h3" color="#333"> Pantry Items </Typography>
            <TextField sx={{width: "35%"}} id="search-item" label="Search" variant="outlined" value={itemFilter} onChange={(e) => setItemFilter(e.target.value)}/>
            <Stack direction="row" spacing={3}>
            <Button variant="contained" onClick={() => {handleOpen()}}><img src="addCircle.png" width={24} height={24} style={{ marginRight: '5px' }}/>Add Item</Button>
            <Button variant= "contained" onClick={() => {
              if(!cameraVisible)
                handleCameraOpen()
              else
              { 
                handleCameraClose()
              }
              }}>
                <img src="addPhoto.png" width={24} height={24} style={{ marginRight: '5px' }}/>
                Use Camera
            </Button>
              
            </Stack>
          </Box>
        
          <Stack width="100%" height="100%" spacing={2} overflow="auto">
            {  
              inventory.filter(item => item.name.toLowerCase().includes(itemFilter.toLowerCase())).map(({name, quantity}) => (
                <Box key={name} width="100%" minHeight="150px" display="flex" alignItems="center" justifyContent="space-between" bgColor="#f0f0f0" padding={5} >
                  <Typography variant="h4" color="#333" textAlign={"center"}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}:
                  </Typography>
                  <Typography variant="h4" color="#333" textAlign={"center"}>
                    {quantity}x
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => addItem(name)}>
                      <img src="addIcon.png" width={24} height={24}/>
                      
                    </Button>
                    <Button variant="contained" onClick={() => removeItem(name)}>
                      <img src="removeIcon.png" width={24} height={24} />
                      
                    </Button>
                  </Stack>
                </Box>
              ))
            }
          </Stack>
        </Card>
      </Box>
    </>
    
  )
}
