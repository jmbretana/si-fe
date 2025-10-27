import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { COLORS } from '@values/colors';
import { useAuth } from '@hooks/useAuth';
import { AuthUser } from '@interfaces';
import { logger } from '@utils/logger';

interface UserProfileProps {
  onClose?: () => void;
  showAsDialog?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  onClose,
  showAsDialog = false,
}) => {
  const { user, isLoading, updateUser, getFullName, getUserInitials } =
    useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<AuthUser>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = () => {
    setEditData({
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      await updateUser(editData);
      setIsEditing(false);
      logger.info('User profile updated successfully');
    } catch (error) {
      logger.error('Error updating user profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleInputChange =
    (field: keyof AuthUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const ProfileContent = () => (
    <Box>
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: COLORS.blue,
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
            src={user?.avatar}
          >
            {getUserInitials()}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {getFullName()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{user?.username}
            </Typography>
            {user?.role && (
              <Chip
                label={user.role}
                size="small"
                color="primary"
                sx={{ mt: 0.5 }}
              />
            )}
          </Box>
        </Box>

        {!isEditing && (
          <IconButton
            onClick={handleEditClick}
            color="primary"
            disabled={isLoading}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Profile Information */}
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PersonIcon color="primary" />
                <Typography variant="h6">Información Personal</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={isEditing ? editData.name || '' : user?.name || ''}
                    onChange={handleInputChange('name')}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={
                      isEditing ? editData.surname || '' : user?.surname || ''
                    }
                    onChange={handleInputChange('surname')}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={isEditing ? editData.email || '' : user?.email || ''}
                    onChange={handleInputChange('email')}
                    disabled={!isEditing}
                    variant={isEditing ? 'outlined' : 'standard'}
                    InputProps={{
                      readOnly: !isEditing,
                    }}
                  />
                </Grid>
              </Grid>

              {isEditing && (
                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Account Information */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <SecurityIcon color="primary" />
                <Typography variant="h6">Información de Cuenta</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Usuario"
                    value={user?.username || ''}
                    disabled
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Rol"
                    value={user?.role || 'Usuario'}
                    disabled
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                {user?.lastLogin && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Último acceso"
                      value={new Date(user.lastLogin).toLocaleString()}
                      disabled
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  if (showAsDialog) {
    return (
      <Dialog
        open
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '600px' },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon />
            Perfil de Usuario
          </Box>
        </DialogTitle>

        <DialogContent>
          <ProfileContent />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box p={3}>
      <ProfileContent />
    </Box>
  );
};

export default UserProfile;
