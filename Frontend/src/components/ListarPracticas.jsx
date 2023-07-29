import { Container, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Textarea, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon} from '@chakra-ui/icons';
import { Global } from '../helpers/Global';
import { useEffect, useState } from "react";
import axios from "axios";

export const ListarPractica = () => {
  const [practicas, setPracticas] = useState([]);
  const [comentarios, setComentarios] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComentarios, setIsOpenComentarios] = useState(false);
  const [comentarioIndex, setComentarioIndex] = useState(0); 
  const [selectedPracticaIndex, setSelectedPracticaIndex] = useState(null);
  const [siguiente, setSiguiente] = useState(true);
  const [largoComentarios, setLargoComentarios]=useState(null);
  const [existeComentario, setExisteComentario]= useState(false);
   
  useEffect(() => {
    getPracticas();
    
    console.log("aqui vamos 1", practicas);
  }, []);

  const getPracticas = async () => {
    const request = await fetch(Global.url + 'getPractica', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status === 'success') {     
      setPracticas(data.practica);     
    }
  }

  const handleComentar = (index) => {
    setSelectedPracticaIndex(index);
   

    setIsOpen(true);
  };

  const handleSubmitComentario = () => {
   
  

    //validaciones
    if(comentarios.trim() === ''){
      
      return alert("El comentario no puede estar vacío. ");
    }

    if(comentarios.length < 50){
   
      return alert("El comentario es demasiado corto, minimo 50 caracteres");
    }
   

    const comentarioData = {
      contenido: comentarios,
      practica: practicas[selectedPracticaIndex]._id
    };


  
  
    axios.post(Global.url + 'feedback', comentarioData)
      .then((response) => {
        console.log('Comentario guardado:', response.data);
        setComentarios('');
        setIsOpen(false);
        axios.get(Global.url + 'addComentario/' + practicas[selectedPracticaIndex]._id);
        getPracticas();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al guardar el comentario en el backend:', error);
      });
       return alert("Comentario registrado con éxito");

  };


 
  const CantidadComentarios = (index) => {

    setLargoComentarios (practicas[index].comentarios.reduce(
      (total, comentario) => total + comentario.length, 0

    ));

       
  }


  const handleVerComentarios = (index,practica) => {
    setSelectedPracticaIndex(index); 
    setIsOpenComentarios(true);
    setComentarioIndex(0);


    if(practica.comentarios[0].length === 0){
      
      setExisteComentario(false);
    }else{
      setExisteComentario(true);
    }


  };


  const handleNextComentario = () => {

  

     
  if (largoComentarios > 0) {
    
    if (comentarioIndex === largoComentarios - 1) {
      setSiguiente(false); 
    } else {
      setComentarioIndex(comentarioIndex + 1); 
      setSiguiente(true);
    }
  }else{
    setSiguiente(false);
  }

        
  };


  const handlePrevComentario = () => {

    
    if (comentarioIndex === 0) {
      return; 
    }
    setComentarioIndex(comentarioIndex - 1);
    if(comentarioIndex !== largoComentarios)
    setSiguiente(true);
  
  };

  const handleDeleteComentario = () => {


    
   
  }




  return (
    <>
      <Heading as={'h1'} mt={'300'} fontSize='2em' textAlign='center' pb={'10'}>Practicas realizadas</Heading>
      <Container maxW='container.2xl'>

        <TableContainer pb={'100'}>
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Nombre práctica</Th>
                <Th>Fecha</Th>
                <Th>Descripcion</Th>
                <Th>Lugar</Th>
                <Th> </Th>
                <Th> </Th>
              </Tr>
            </Thead>
            <Tbody>
              {practicas.map((practica, index) => {
                return (
                  <Tr key={practica._id}>
                    <Td>{practica.nombre_practica}</Td>
                    <Td>{practica.fecha}</Td>
                    <Td>{practica.descripcion}</Td>
                    <Td>{practica.lugar}</Td>
                    <Td>
                      <Button colorScheme="blue" onClick={() => { handleVerComentarios(index, practica), CantidadComentarios(index)}}>Ver comentarios</Button>
                    </Td>
                    <Td>
                      <Button colorScheme='blue' onClick={() => { handleComentar (index) }}>Comentar</Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comentar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
     
            <Textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Escribe tu comentario aquí..." />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button colorScheme="green" onClick={handleSubmitComentario}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenComentarios} onClose={() => {setIsOpenComentarios(false), setSiguiente(true), setLargoComentarios(null), setExisteComentario(false)}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Comentarios </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Comentarios</Th>
                </Tr>
              </Thead>
              <Tbody>
                
                {selectedPracticaIndex !== null &&
                  practicas[selectedPracticaIndex].comentarios.map((comentario, index) => (
                    <Tr key={index}>
                      {console.log("index practicaA: " + selectedPracticaIndex)}
                      
                     
                  
                      
                      {
                        
                        existeComentario?<Td> {comentario[comentarioIndex].contenido}</Td> : <Td> No hay comentarios existentes </Td>
                      }
                       


                       
                       
                 
                    </Tr>
                  ))}

              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red"  mr={3} leftIcon={<DeleteIcon />} onClick={handleDeleteComentario} isDisabled={!existeComentario}>
            

            </Button>
            <Button colorScheme="blue" mr={3} onClick={handlePrevComentario} isDisabled={comentarioIndex === 0}>
              <ChevronLeftIcon />
            </Button>
                   {
                    siguiente? <Button colorScheme="blue" mr={3} onClick={handleNextComentario}  >
                    <ChevronRightIcon/>
                  </Button> :
                  <Button colorScheme="blue" mr={3} onClick={handleNextComentario}  isDisabled>
                  <ChevronRightIcon/>
                </Button>
                  
                   }
       
            <Button colorScheme="blue" mr={3} onClick={() => {setIsOpenComentarios(false), setSiguiente(true), setLargoComentarios(null), setExisteComentario(false)} }>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

