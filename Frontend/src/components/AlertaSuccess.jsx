import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, useDisclosure } from "@chakra-ui/react"

export const AlertaSuccess = () => {
    const {
        isOpen: isVisible,
        onClose,
    } = useDisclosure({ defaultIsOpen: true })
    return isVisible ? (
        <Alert status='success'>
            <AlertIcon />
            <Box>
                <AlertTitle>Éxito!</AlertTitle>
                <AlertDescription>
                    El brigadista se ha registrado con éxito
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : ''
}
