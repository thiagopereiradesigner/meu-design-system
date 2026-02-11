import React, { useState } from 'react';
import { tokens } from './tokens';

import { Textarea } from './Textarea/Textarea';
import { Checkbox } from './Checkbox/Checkbox';
import { RadioGroup } from './Radio/Radio';
import { Switch } from './Switch/Switch';

// ==================== DEMO ====================
export default function FormComponentsDemo() {
  const [textareaValue, setTextareaValue] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);

  const containerStyle = {
    padding: '40px',
    backgroundColor: '#F9F9F9',
    minHeight: '100vh',
    fontFamily: tokens.typography.fontFamily,
  };

  const sectionStyle = {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#1A1A1A',
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px',
    marginTop: '24px',
    color: '#393939',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#005A1A' }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: '16px', color: '#5E5E5E' }}>
          Textarea, Checkbox, Radio & Switch
        </p>
      </div>

      {/* TEXTAREA */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📝 Textarea</h2>
        
        <h3 style={subtitleStyle}>Basic</h3>
        <div style={gridStyle}>
          <Textarea
            label="Comentário"
            placeholder="Digite seu comentário..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          
          <Textarea
            label="Descrição"
            placeholder="Descreva o problema..."
            helperText="Máximo de 500 caracteres"
            maxLength={500}
            showCharCount
          />
        </div>

        <h3 style={subtitleStyle}>States</h3>
        <div style={gridStyle}>
          <Textarea
            label="Com Erro"
            placeholder="Digite algo..."
            error="Este campo é obrigatório"
          />
          
          <Textarea
            label="Desabilitado"
            placeholder="Campo desabilitado"
            value="Texto não editável"
            disabled
          />
        </div>

        <h3 style={subtitleStyle}>Resize Options</h3>
        <div style={gridStyle}>
          <Textarea
            label="Vertical Resize"
            placeholder="Redimensiona verticalmente..."
            resize="vertical"
          />
          
          <Textarea
            label="No Resize"
            placeholder="Sem redimensionar..."
            resize="none"
          />
        </div>
      </div>

      {/* CHECKBOX */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>✅ Checkbox</h2>
        
        <h3 style={subtitleStyle}>Basic</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Checkbox
            label="Aceito os termos e condições"
            checked={checkbox1}
            onChange={setCheckbox1}
          />
          
          <Checkbox
            label="Receber notificações por email"
            checked={checkbox2}
            onChange={setCheckbox2}
          />
          
          <Checkbox
            label="Indeterminate State"
            checked={false}
            indeterminate={true}
            helperText="Estado intermediário (alguns selecionados)"
          />
        </div>

        <h3 style={subtitleStyle}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Checkbox
            label="Com erro"
            error="Você deve aceitar os termos"
          />
          
          <Checkbox
            label="Desabilitado (unchecked)"
            disabled
          />
          
          <Checkbox
            label="Desabilitado (checked)"
            checked
            disabled
          />
        </div>
      </div>

      {/* RADIO */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🔘 Radio</h2>
        
        <h3 style={subtitleStyle}>Radio Group (Vertical)</h3>
        <RadioGroup
          label="Método de pagamento"
          name="payment"
          value={radioValue}
          onChange={setRadioValue}
          options={[
            { label: 'Cartão de crédito', value: 'credit' },
            { label: 'Cartão de débito', value: 'debit' },
            { label: 'PIX', value: 'pix' },
            { label: 'Boleto', value: 'boleto' },
          ]}
          helperText="Escolha uma forma de pagamento"
        />

        <h3 style={subtitleStyle}>Radio Group (Horizontal)</h3>
        <RadioGroup
          label="Tamanho"
          name="size"
          direction="horizontal"
          options={[
            { label: 'Pequeno', value: 'small' },
            { label: 'Médio', value: 'medium' },
            { label: 'Grande', value: 'large' },
          ]}
        />

        <h3 style={subtitleStyle}>With Error</h3>
        <RadioGroup
          label="Gênero"
          name="gender"
          error="Este campo é obrigatório"
          options={[
            { label: 'Masculino', value: 'male' },
            { label: 'Feminino', value: 'female' },
            { label: 'Outro', value: 'other' },
          ]}
        />
      </div>

      {/* SWITCH */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🎚️ Switch</h2>
        
        <h3 style={subtitleStyle}>Basic</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            label="Ativar notificações"
            checked={switch1}
            onChange={setSwitch1}
          />
          
          <Switch
            label="Modo escuro"
            checked={switch2}
            onChange={setSwitch2}
          />
        </div>

        <h3 style={subtitleStyle}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            label="Small"
            size="small"
            checked={switch1}
            onChange={setSwitch1}
          />
          
          <Switch
            label="Medium (default)"
            size="medium"
            checked={switch2}
            onChange={setSwitch2}
          />
        </div>

        <h3 style={subtitleStyle}>Label Position</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            label="Label à direita (default)"
            labelPosition="right"
            checked={switch1}
            onChange={setSwitch1}
          />
          
          <Switch
            label="Label à esquerda"
            labelPosition="left"
            checked={switch2}
            onChange={setSwitch2}
          />
        </div>

        <h3 style={subtitleStyle}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            label="Desabilitado (off)"
            disabled
          />
          
          <Switch
            label="Desabilitado (on)"
            checked
            disabled
          />
        </div>
      </div>
    </div>
  );
}
