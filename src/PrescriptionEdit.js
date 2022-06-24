import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const PrescriptionEdit = () => {
  const initialFormState = {
    name: '',
    amount: ''
  };

  const [Prescription, setPrescription] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/Prescription/${id}`)
        .then(response => response.json())
        .then(data => setPrescription(data));
    }
  }, [id, setPrescription]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setPrescription({ ...Prescription, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/Prescription` + (Prescription.id ? '?' + 'id=' + Prescription.id : ''), {
      method: (Prescription.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Prescription)
    });
    setPrescription(initialFormState);
    navigate('/');
  }

  const title = <h2>{Prescription.id ? 'Edit Prescription' : 'Add Prescription'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={Prescription.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input type="decimal" name="amount" id="amount" value={Prescription.amount || ''}
                   onChange={handleChange} autoComplete="amount-level1"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default PrescriptionEdit