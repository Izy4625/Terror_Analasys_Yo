import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { attack } from '../../types/attack'
import Grid from '@mui/material/Grid2';
const FormWithDialog: React.FC = () => {
  
  const [open, setOpen] = useState(false);

  
  const [formValues, setFormValues] = useState<attack>({
    eventid: 0,
    iyear: 0,
    imonth: 0,
    iday: 0,
    country_txt: '',
    region_txt: '',
    city: '',
    latitude: 0,
    longitude: 0,
    attacktype1_txt: '',
    targtype1_txt: '',
    target1: '',
    gname: '',
    weaptype1_txt: '',
    nkill: 0,
    nwound: 0,
    nperps: 0,
    summary: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form values:', formValues);
    const res = await fetch('https://terror-analasys-yo.onrender.com/api/attacks/create',{
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data)
    handleClose();
  };


  return (
    <div>
     
      <Button variant="contained" color="primary" onClick={handleOpen}>
        +
      </Button>

   
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle> Create New Attack </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            
              <Grid container spacing={2}>
                <TextField
                  label="Country"
                  name="country_txt"
                  value={formValues.country_txt}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

  
              <Grid container spacing={2}>
                <TextField
                  label="Group Name"
                  name="gname"
                  value={formValues.gname}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Latitude"
                  name="latitude"
                  type="number"
                  value={formValues.latitude}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Longitude"
                  name="longitude"
                  type="number"
                  value={formValues.longitude}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Attack Type"
                  name="attacktype1_txt"
                  value={formValues.attacktype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Target Type"
                  name="targtype1_txt"
                  value={formValues.targtype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

          
              <Grid container spacing={2}>
                <TextField
                  label="Target"
                  name="target1"
                  value={formValues.target1}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

         
              <Grid container spacing={2}>
                <TextField
                  label="Weapon Type"
                  name="weaptype1_txt"
                  value={formValues.weaptype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Number Killed"
                  name="nkill"
                  type="number"
                  value={formValues.nkill}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

            
              <Grid container spacing={2}>
                <TextField
                  label="Number Wounded"
                  name="nwound"
                  type="number"
                  value={formValues.nwound}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

             
              <Grid container spacing={2}>
                <TextField
                  label="Number of Perpetrators"
                  name="nperps"
                  type="number"
                  value={formValues.nperps}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid container spacing={2}>
                <TextField
                  label="Summary"
                  name="summary"
                  value={formValues.summary}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Submit Button */}
              <Grid container spacing={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormWithDialog;
