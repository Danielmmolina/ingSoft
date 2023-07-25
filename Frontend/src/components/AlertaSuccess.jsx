import { Alert, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure } from "@chakra-ui/react"

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
