import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormEntregador() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setqtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [ativo, setAtivo] = useState();

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(response.data.dataNascimento)
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setqtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.enderecoRua)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoCidade(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])


    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo
        }



        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o entregador.')
            })
    }

    const countryOptions = [
        { key: 'pe', value: 'pe', text: 'Pernambuco' },
        { key: 'al', value: 'al', text: 'Alagoas' },
        { key: 'ce', value: 'ce', text: 'Ceará' },
    ];

    return (

        <div>
            <MenuSistema tela={'entregador'} />

            <Container textAlign='justified' style={{ marginTop: '3%' }}>

                {idEntregador === undefined &&
                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                }
                {idEntregador != undefined &&
                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                }

                <Divider />

                <Form style={{ marginTop: '4%' }}>
                    <Form.Group widths='equal'>
                        <Form.Input
                            required
                            fluid
                            label='Nome'
                            maxLength="100"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <Form.Input
                            required
                            fluid
                            label='CPF'
                        >
                            <InputMask
                                required
                                mask="999.999.999-99"
                                value={cpf}
                                onChange={e => setCpf(e.target.value)}
                            />
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='RG'
                            maxLength="20"
                            value={rg}
                            onChange={e => setRg(e.target.value)}
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
                                value={dataNascimento}
                                onChange={e => setDataNascimento(e.target.value)}
                            />
                        </Form.Input>
                        <Form.Input
                            required
                            fluid
                            label='Fone Celular'
                        >
                            <InputMask
                                mask="(99) 9999.9999"
                                value={foneCelular}
                                onChange={e => setFoneCelular(e.target.value)}
                            />
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='Fone Fixo'
                        >
                            <InputMask
                                mask="(99) 9999.9999"
                                value={foneFixo}
                                onChange={e => setFoneFixo(e.target.value)}
                            />
                        </Form.Input>
                        <Form.Input
                            fluid
                            label='QTD de Entregas realizadas'
                            value={qtdEntregasRealizadas}
                            onChange={e => setqtdEntregasRealizadas(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            label='Valor por Frete'
                            value={valorFrete}
                            onChange={e => setValorFrete(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='Rua'
                            value={enderecoRua}
                            onChange={e => setEnderecoRua(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            label='Número'
                            width={4}
                            value={enderecoNumero}
                            onChange={e => setEnderecoNumero(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='Bairro'
                            value={enderecoBairro}
                            onChange={e => setEnderecoBairro(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            label='Cidade'
                            value={enderecoCidade}
                            onChange={e => setEnderecoCidade(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            label='CEP'
                            value={enderecoCep}
                            onChange={e => setEnderecoCep(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Field>
                        <label>UF</label>
                        <Form.Select
                            placeholder='Selecione'
                            options={countryOptions}
                            value={enderecoUf}
                            onChange={(e, { value }) => setEnderecoUf(value)}

                        />
                    </Form.Field>

                    <Form.Input
                        fluid
                        label='Complemento'
                        value={enderecoComplemento}
                        onChange={e => setEnderecoComplemento(e.target.value)}
                    />

                    <Form.Field>
                        <label>Ativo</label>
                        <Form.Group inline>
                            <Form.Radio
                                label='Sim'
                                name="radioGroup"
                                value="sim"
                                style={{ marginRight: '1em' }}
                                checked={ativo}
                                onChange={e => setAtivo(true)}
                            />
                            <Form.Radio
                                label='Não'
                                name="radioGroup"
                                value="não"
                                checked={!ativo}
                                onChange={e => setAtivo(false)}
                            />
                        </Form.Group>

                    </Form.Field>

                    <div style={{ marginTop: '4%' }}>

                        <Link to={'/list-entregador'}>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' /> Voltar
                            </Button>
                        </Link>

                        <Button
                            inverted
                            circular
                            icon
                            labelPosition='left'
                            color='blue'
                            floated='right'
                            onClick={() => salvar()}
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
