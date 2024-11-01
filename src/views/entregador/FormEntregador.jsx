import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, Select, Radio } from 'semantic-ui-react';

export default function FormProduto() {

    const countryOptions = [
        { key: 'pe', value: 'pe', text: 'Pernambuco' },
        { key: 'al', value: 'al', text: 'Alagoas' },
        { key: 'ce', value: 'ce', text: 'Ceará' },

    ]
    return (

        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    maxLength="20"
                                />

                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Data de Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                    />

                                </Form.Input>


                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD de entregas realizadas'
                                />

                                <Form.Input
                                    fluid
                                    label='Valor por frete'
                                />


                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={10}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                />


                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                />

                            </Form.Group>

                            <Form.Group>
                                <Select placeholder='Selecione' options={countryOptions} />
                            </Form.Group>
                            



                            <Form.Input
                                fluid
                                label='Complemento'
                            />

                            <Form.Input
                                fluid
                                label='Complemento'
                            />






                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
