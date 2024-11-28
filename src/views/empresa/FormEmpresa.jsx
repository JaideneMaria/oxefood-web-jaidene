
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormEmpresa() {

    const [site, setSite] = useState();
    const [cnpj, setCnpj] = useState();
    const [inscricaoEstadual, setInscricaoEstadual] = useState();
    const [nomeEmpresarial, setNomeEmpresarial] = useState();
    const [nomeFantasia, setNomeFantasia] = useState();
    const [fone, setFone] = useState();
    const [foneAlternativo, setFoneAlternativo] = useState();
    const [dataEmpresa, setDataEmpresa] = useState();
    const [empresaStatus, setEmpresaStatus] = useState();


    const { state } = useLocation();
    const [idEmpresa, setIdEmpresa] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/empresa/" + state.id)
                .then((response) => {
                    setIdEmpresa(response.data.id)
                    setSite(response.data.site)
                    setCnpj(response.data.cnpj)
                    setInscricaoEstadual(response.data.inscricaoEstadual)
                    setNomeEmpresarial(response.data.nomeEmpresarial)
                    setNomeFantasia(response.data.nomeFantasia)
                    setFone(response.data.fone)
                    setFoneAlternativo(response.data.foneAlternativo)
                    setDataEmpresa(formatarData(response.data.dataEmpresa))
                    setEmpresaStatus(response.data.empresaStatus)
                })
        }
    }, [state])


    function salvar() {

        let empresaRequest = {
            site: site,
            cnpj: cnpj,
            inscricaoEstadual: inscricaoEstadual,
            nomeEmpresarial: nomeEmpresarial,
            nomeFantasia: nomeFantasia,
            fone: fone,
            foneAlternativo: foneAlternativo,
            dataEmpresa: dataEmpresa,
            empresaStatus: empresaStatus

        }

        if (idEmpresa != null) { //Alteração:
            axios.put("http://localhost:8080/api/empresa/" + idEmpresa, empresaRequest)
                .then((response) => { console.log('Empresa alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar a empresa.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/empresa", empresaRequest)
                .then((response) => { console.log('Empresa cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a empresa.') })
        }
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }


    return (

        <div>
            <MenuSistema tela={'empresa'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idEmpresa === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Empresa &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEmpresa != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Empresa &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Site'
                                    maxLength="100"
                                    value={site}
                                    onChange={e => setSite(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CNPJ'>
                                    <InputMask
                                        required
                                        mask="99.999.999/9999-99"
                                        value={cnpj}
                                        onChange={e => setCnpj(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='IE'
                                    maxLength="16"
                                    value={inscricaoEstadual}
                                    onChange={e => setInscricaoEstadual(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Nome Empresarial'
                                    width={6}
                                    value={nomeEmpresarial}
                                    onChange={e => setNomeEmpresarial(e.target.value)}>

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Nome Fantasia'
                                    width={6}
                                    value={nomeFantasia}
                                    onChange={e => setNomeFantasia(e.target.value)}>

                                </Form.Input>

                            </Form.Group>
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={fone}
                                        onChange={e => setFone(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Alternativo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneAlternativo}
                                        onChange={e => setFoneAlternativo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data de Cadastro da Empresa'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataEmpresa}
                                        onChange={e => setDataEmpresa(e.target.value)}
                                    />

                                </Form.Input>

                            </Form.Group>

                            <Form.Field>
                                <label>Ativo</label>
                                <Form.Group inline>
                                    <Form.Radio
                                        label='Sim'
                                        name="radioGroup"
                                        value="sim"
                                        style={{ marginRight: '1em' }}
                                        checked={empresaStatus}
                                        onChange={e => setEmpresaStatus(true)}
                                    />
                                    <Form.Radio
                                        label='Não'
                                        name="radioGroup"
                                        value="não"
                                        checked={!empresaStatus}
                                        onChange={e => setEmpresaStatus(false)}
                                    />
                                </Form.Group>

                            </Form.Field>


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
                                <Link to={'/list-empresa'}>Voltar</Link>

                            </Button>

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

                    </div>

                </Container>
            </div>
        </div>

    );

}
