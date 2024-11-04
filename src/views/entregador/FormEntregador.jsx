import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto() {
    const countryOptions = [
        { key: 'pe', value: 'pe', text: 'Pernambuco' },
        { key: 'al', value: 'al', text: 'Alagoas' },
        { key: 'ce', value: 'ce', text: 'Ceará' },
    ];

    return (

        <div>
            <Container textAlign='justified' style={{ marginTop: '3%' }}>
                <h2>
                    <span style={{ color: 'darkgray' }}>
                        Entregador &nbsp;<Icon name='angle double right' size="small" />
                    </span>
                    Cadastro
                </h2>
                <Divider />

                <Form style={{ marginTop: '4%' }}>
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
                            label='CPF'
                        >
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
                        >
                            <InputMask
                                mask="(99) 9999.9999"
                            />
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='Fone Fixo'
                        >
                            <InputMask
                                mask="(99) 9999.9999"
                            />
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='QTD de Entregas realizadas'
                        />
                        <Form.Input
                            fluid
                            label='Valor por Frete'
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='Rua'
                        />
                        <Form.Input
                            fluid
                            label='Número'
                            width={4}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
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

                    <Form.Field>
                        <label>UF</label>
                        <Form.Select
                            placeholder='Selecione'
                            options={countryOptions}
                        />
                    </Form.Field>

                    <Form.Input
                        fluid
                        label='Complemento'
                    />

                    <Form.Field>
                        <label>Ativo</label>
                        <Form.Radio
                            label='Sim'
                            name="radioGroup"
                            value="sim"
                            style={{ marginRight: '1em' }}
                        />
                        <Form.Radio
                            label='Não'
                            name="radioGroup"
                            value="não"
                        />
                    </Form.Field>

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
                </Form>
            </Container>
        </div>

    );
}
