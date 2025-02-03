import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';

interface SearchShipmentProps {
    open: boolean;
    onClose: () => void;
    onSearch: (trackingNumber: string) => void;
}

export const SearchShipment = ({ open, onClose, onSearch }: SearchShipmentProps) => {
    const [trackingNumber, setTrackingNumber] = useState<string>('');

    const handleSearch = () => {
        if (trackingNumber === null) return;
        onSearch(trackingNumber);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                Seguir envío
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Número de seguimiento"
                    type="number"
                    fullWidth
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSearch} color="primary">
                    Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};