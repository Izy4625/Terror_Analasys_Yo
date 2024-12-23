import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { attack } from '../../types/attack'
import Grid from '@mui/material/Grid2';
const FormWithDialog: React.FC = () => {
  // State for controlling the dialog visibility
  const [open, setOpen] = useState(false);

  // State for form values
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

  // Open and close the dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle change in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form values:', formValues);
    handleClose(); // Close the dialog after form submission
  };

  return (
    <div>
      {/* Button to open the form in the dialog */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        +
      </Button>

      {/* Dialog that contains the form */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Submit Attack Data</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Country */}
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

              {/* Group Name */}
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

              {/* Latitude */}
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

              {/* Longitude */}
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

              {/* Attack Type */}
              <Grid container spacing={2}>
                <TextField
                  label="Attack Type"
                  name="attacktype1_txt"
                  value={formValues.attacktype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Target Type */}
              <Grid container spacing={2}>
                <TextField
                  label="Target Type"
                  name="targtype1_txt"
                  value={formValues.targtype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Target */}
              <Grid container spacing={2}>
                <TextField
                  label="Target"
                  name="target1"
                  value={formValues.target1}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Weapons Type */}
              <Grid container spacing={2}>
                <TextField
                  label="Weapon Type"
                  name="weaptype1_txt"
                  value={formValues.weaptype1_txt}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Number Killed */}
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

              {/* Number Wounded */}
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

              {/* Number of Perpetrators */}
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

              {/* Summary */}
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
