/* ===================================================================
   Configuración por defecto
   =================================================================== */
const CONFIG_DEFECTO = {
  apiUrl: '',
  authUrl: '',
  token: ''
};
const CLAVE_LOCAL = 'tablero-iso27001-config';

/* Paleta (validada: categórica 2 colores y rampa ordinal azul, claro y oscuro) */
const TEMAS = {
  claro: {
    surface: '#fcfcfb', ink: '#0b0b0b', ink2: '#52514e', muted: '#898781', grid: '#e1e0d9', base: '#c3c2b7',
    borde: '#e1e0d9', s1: '#2a78d6', s2: '#eb6834', na: '#c3c2b7',
    rampa: ['#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#104281']
  },
  oscuro: {
    surface: '#1a1a19', ink: '#f0efec', ink2: '#c3c2b7', muted: '#898781', grid: '#2c2c2a', base: '#383835',
    borde: '#383835', s1: '#3987e5', s2: '#d95926', na: '#52514e',
    rampa: ['#184f95', '#256abf', '#3987e5', '#6da7ec', '#9ec5f4']
  }
};
const FUENTE = 'system-ui, -apple-system, "Segoe UI", sans-serif';

/* Etiquetas cortas */
const NIVELES = ['1 - Inicial', '2 - Repetible', '3 - Definido', '4 - Gestionado', '5 - Optimizado'];
const DIMENSIONES = [
  ['prom_liderazgo', 'Liderazgo y política'], ['prom_riesgos', 'Gestión de riesgos'],
  ['prom_controles', 'Controles y operación'], ['prom_evaluacion_mejora', 'Evaluación y mejora']
];
const CORTAS_ISO = {
  1: 'Compromiso de la dirección', 2: 'Política de seguridad', 3: 'Roles y responsabilidades',
  4: 'Evaluación de riesgos', 5: 'Riesgos documentados', 6: 'Tratamiento de riesgos',
  7: 'Controles técnicos', 8: 'Control de acceso', 9: 'Gestión de incidentes',
  10: 'Auditoría interna', 11: 'Acciones correctivas', 12: 'Revisión por la dirección'
};
const CORTAS_IMPACTO = {
  1: 'Incidentes disminuyeron', 2: 'Menor impacto', 3: 'Mejor detección y respuesta',
  4: 'Confianza de clientes', 5: 'Imagen y reputación', 6: 'Ventaja competitiva'
};
const CORTAS_INCIDENTE = {
  'Phishing o correos electrónicos fraudulentos': 'Phishing',
  'Malware / virus / ransomware': 'Malware / ransomware',
  'Accesos no autorizados a sistemas o redes': 'Accesos no autorizados',
  'Fugas o pérdida de información confidencial': 'Fuga de información',
  'Ataques de denegación de servicio (DoS/DDoS)': 'DoS / DDoS',
  'Errores humanos o configuraciones incorrectas': 'Errores humanos / config.',
  'Fallas de hardware o software crítico': 'Fallas de hardware / software',
  'Interrupciones del servicio por fallas eléctricas o de red': 'Cortes eléctricos / de red',
  'Uso indebido de privilegios por empleados o ex empleados': 'Uso indebido de privilegios',
  'Ingeniería social (suplantación de identidad, manipulación)': 'Ingeniería social',
  'Incumplimiento de políticas internas de seguridad': 'Incumplimiento de políticas'
};
const PREGUNTAS_FICHA = [
  [1, 'Nombre de la empresa', 'texto', null],
  [2, 'Tamaño de la empresa', 'opcion_unica', 'Perfil'],
  [3, 'Tipo de servicios tecnológicos que ofrece', 'opcion_unica', 'Perfil'],
  [4, 'Total de incidentes de seguridad reportados en los últimos 12 meses', 'numero', 'Incidentes'],
  [5, 'Tipo de incidentes más comunes', 'multiple', 'Incidentes'],
  [6, 'Impacto económico estimado de los incidentes (en quetzales)', 'opcion_unica', 'Incidentes'],
  [7, 'Tiempo promedio de recuperación (en horas)', 'numero', 'Respuesta a incidentes'],
  [8, 'Existe un registro formal de incidentes', 'opcion_unica', 'Respuesta a incidentes'],
  [9, 'Se realizaron acciones correctivas documentadas tras los incidentes', 'opcion_unica', 'Respuesta a incidentes'],
  [10, 'El número de incidentes ha disminuido en comparación con el año anterior', 'opcion_unica', 'Incidentes']
];
const FORMULARIOS_UI = [
  { v: 'FICHA', t: 'Ficha de incidentes' }, { v: 'IMPACTO', t: 'Impacto y competitividad' }, { v: 'ISO', t: 'Adopción ISO 27001' }
];
const TIPOS_PREGUNTA = { likert: 'Escala 1 a 5', opcion_unica: 'Opción única', multiple: 'Elección múltiple', numero: 'Número', texto: 'Texto' };
const ESCALA_LIKERT = { 1: '1 · En desacuerdo', 2: '2', 3: '3', 4: '4', 5: '5 · Totalmente de acuerdo' };
/* Orden natural de las opciones conocidas (lo demás se ordena por cantidad) */
const ORDEN_OPCIONES = ['Si', 'No', 'Mediana (50-250 Empleados)', 'Grande (+250 Empleados)',
  'Menos de Q 5,000', 'Entre Q 5,001 y Q 20,000', 'Entre Q 20,001 y Q 50,000', 'Entre Q 50,001 y Q 100,000',
  'Entre Q 100,001 y Q 250,000', 'Más de Q 250,000', 'No se tiene estimación (N/A)'];
function estadisticas(vals) {
  const v = vals.filter(x => x !== null && !Number.isNaN(x)).sort((a, b) => a - b);
  if (!v.length) return { n: 0 };
  const mitad = Math.floor(v.length / 2);
  return {
    n: v.length, promedio: v.reduce((a, b) => a + b, 0) / v.length,
    mediana: v.length % 2 ? v[mitad] : (v[mitad - 1] + v[mitad]) / 2, min: v[0], max: v[v.length - 1]
  };
}
function contarOpciones(valores) {
  const m = new Map();
  valores.forEach(v => m.set(v, (m.get(v) || 0) + 1));
  const ops = [...m.entries()].map(([etiqueta, cantidad]) => ({ etiqueta, cantidad }));
  const conocidas = ops.every(o => ORDEN_OPCIONES.includes(o.etiqueta));
  return ops.sort(conocidas
    ? (a, b) => ORDEN_OPCIONES.indexOf(a.etiqueta) - ORDEN_OPCIONES.indexOf(b.etiqueta)
    : (a, b) => b.cantidad - a.cantidad || String(a.etiqueta).localeCompare(String(b.etiqueta), 'es'));
}
function rangosNumericos(vals, esHoras) {
  const cortes = esHoras
    ? [['Hasta 4 h', x => x <= 4], ['Más de 4 a 8 h', x => x > 4 && x <= 8], ['Más de 8 a 16 h', x => x > 8 && x <= 16],
       ['Más de 16 a 24 h', x => x > 16 && x <= 24], ['Más de 24 h', x => x > 24]]
    : [['0 a 2', x => x <= 2], ['3 a 5', x => x >= 3 && x <= 5], ['6 a 10', x => x >= 6 && x <= 10], ['11 o más', x => x >= 11]];
  return cortes.map(([etiqueta, f]) => ({ etiqueta, cantidad: vals.filter(f).length }));
}
/* Resume, para un formulario, cómo se respondió cada pregunta */
function resumirPreguntas(filas, formulario) {
  const delForm = filas.filter(f => f.formulario === formulario);
  return [...agrupar(delForm, f => Number(f.pregunta_num)).entries()].sort((a, b) => a[0] - b[0]).map(([num, rs]) => {
    const tipo = rs[0].tipo_respuesta, texto = rs[0].pregunta;
    const n = new Set(rs.map(r => r.respuesta_id)).size;
    const validas = rs.map(r => r.respuesta).filter(v => v !== null && v !== undefined && v !== '');
    let opciones, stats = null;
    if (tipo === 'likert') {
      const vals = validas.map(Number);
      opciones = [1, 2, 3, 4, 5].map(v => ({ etiqueta: ESCALA_LIKERT[v], cantidad: vals.filter(x => x === v).length }));
      stats = estadisticas(vals);
    } else if (tipo === 'numero') {
      const vals = validas.map(Number).filter(x => !Number.isNaN(x));
      opciones = rangosNumericos(vals, /hora/i.test(texto));
      stats = estadisticas(vals);
    } else if (tipo === 'multiple') {
      opciones = contarOpciones(validas.flatMap(v => String(v).split(';').map(x => x.trim()).filter(Boolean)));
    } else {
      opciones = contarOpciones(validas.map(String));
    }
    opciones.forEach(o => { o.pct = n ? (100 * o.cantidad) / n : 0; });
    return { num, texto, tipo, n, opciones, stats, filas: rs };
  });
}
const RANGOS_CORTOS = ['< Q5 mil', 'Q5–20 mil', 'Q20–50 mil', 'Q50–100 mil', 'Q100–250 mil', '> Q250 mil', 'Sin estimación'];

const GRAFICAS = [
  { key: 'adopcionSector', titulo: 'Índice de adopción ISO 27001 por sector', sub: 'Promedio del índice 0–100 % del cuestionario ISO' },
  { key: 'nivelMadurez', titulo: 'Respuestas por nivel de madurez', sub: 'Según el promedio de las 12 preguntas ISO' },
  { key: 'dimensiones', titulo: 'Promedio por dimensión ISO', sub: 'Escala 1 (en desacuerdo) a 5 (totalmente de acuerdo)' },
  { key: 'requisitos', titulo: 'Requisitos ISO, del más débil al más fuerte', sub: 'Promedio por pregunta (1–5) y cláusula relacionada' },
  { key: 'tiposIncidente', titulo: 'Tipos de incidente más frecuentes', sub: 'Número de fichas que marcan cada tipo' },
  { key: 'impactoEconomico', titulo: 'Impacto económico estimado', sub: 'Número de fichas por rango en quetzales' },
  { key: 'adopcionVsIncidentes', titulo: 'Adopción ISO vs. incidentes', sub: 'Una empresa por punto (últimos 12 meses)' },
  { key: 'percepcionImpacto', titulo: 'Percepción de impacto en seguridad y competitividad', sub: 'Promedio por pregunta (1–5)' }
];

const COLUMNAS = {
  empresas: [
    { k: 'empresa', t: 'Empresa' }, { k: 'sector', t: 'Sector' }, { k: 'tamano', t: 'Tamaño' },
    { k: 'tipo_servicio', t: 'Tipo de servicio' }, { k: 'iso27001_publica', t: 'ISO 27001 pública' },
    { k: 'iso_promedio', t: 'Adopción ISO (1-5)', f: 'dec2' }, { k: 'iso_indice_pct', t: 'Índice adopción (%)', f: 'dec1' },
    { k: 'iso_nivel', t: 'Nivel de madurez' }, { k: 'total_incidentes', t: 'Incidentes 12 meses', f: 'int' },
    { k: 'impacto_economico', t: 'Impacto económico' }, { k: 'tiempo_recuperacion_h', t: 'Recuperación (h)', f: 'dec1' },
    { k: 'registro_formal', t: 'Registro formal', f: 'bool' }, { k: 'acciones_correctivas', t: 'Acciones correctivas', f: 'bool' },
    { k: 'incidentes_disminuyeron', t: 'Incidentes disminuyeron', f: 'bool' },
    { k: 'impacto_seguridad', t: 'Impacto seguridad (1-5)', f: 'dec2' }, { k: 'impacto_competitividad', t: 'Impacto competitividad (1-5)', f: 'dec2' },
    { k: 'origen_ficha', t: 'Origen ficha' }, { k: 'origen_iso', t: 'Origen ISO' }, { k: 'origen_impacto', t: 'Origen impacto' }
  ],
  iso: [
    { k: 'respuesta_id', t: 'Respuesta', f: 'int' }, { k: 'origen', t: 'Origen' }, { k: 'empresa', t: 'Empresa', vacio: '(anónima)' },
    { k: 'sector', t: 'Sector' }, { k: 'tamano', t: 'Tamaño' }, { k: 'iso27001_publica', t: 'ISO 27001 pública' },
    { k: 'promedio_total', t: 'Promedio (1-5)', f: 'dec2' }, { k: 'indice_adopcion_pct', t: 'Índice (%)', f: 'dec1' },
    { k: 'nivel_madurez', t: 'Nivel de madurez' }, { k: 'prom_liderazgo', t: 'Liderazgo', f: 'dec2' },
    { k: 'prom_riesgos', t: 'Riesgos', f: 'dec2' }, { k: 'prom_controles', t: 'Controles', f: 'dec2' },
    { k: 'prom_evaluacion_mejora', t: 'Evaluación y mejora', f: 'dec2' }
  ],
  impacto: [
    { k: 'respuesta_id', t: 'Respuesta', f: 'int' }, { k: 'origen', t: 'Origen' }, { k: 'empresa', t: 'Empresa', vacio: '(anónima)' },
    { k: 'sector', t: 'Sector' }, { k: 'tamano', t: 'Tamaño' }, { k: 'promedio_total', t: 'Promedio (1-5)', f: 'dec2' },
    { k: 'prom_seguridad', t: 'Impacto en seguridad', f: 'dec2' }, { k: 'prom_competitividad', t: 'Impacto en competitividad', f: 'dec2' }
  ],
  incidentes: [
    { k: 'respuesta_id', t: 'Respuesta', f: 'int' }, { k: 'fecha', t: 'Fecha' }, { k: 'origen', t: 'Origen' },
    { k: 'empresa', t: 'Empresa' }, { k: 'sector', t: 'Sector' }, { k: 'tamano', t: 'Tamaño' },
    { k: 'tipo_servicio', t: 'Tipo de servicio' }, { k: 'total_incidentes', t: 'Incidentes 12 meses', f: 'int' },
    { k: 'impacto_economico', t: 'Impacto económico' }, { k: 'tiempo_recuperacion_h', t: 'Recuperación (h)', f: 'dec1' },
    { k: 'registro_formal', t: 'Registro formal', f: 'bool' }, { k: 'acciones_correctivas', t: 'Acciones correctivas', f: 'bool' },
    { k: 'incidentes_disminuyeron', t: 'Incidentes disminuyeron', f: 'bool' }, { k: 'tipos_marcados', t: 'Tipos marcados', f: 'int' }
  ],
  tipos: [
    { k: 'respuesta_id', t: 'Respuesta', f: 'int' }, { k: 'origen', t: 'Origen' }, { k: 'empresa', t: 'Empresa' },
    { k: 'sector', t: 'Sector' }, { k: 'tamano', t: 'Tamaño' }, { k: 'tipo_incidente', t: 'Tipo de incidente' },
    { k: 'categoria', t: 'Categoría' }
  ],
  detalle: [
    { k: 'respuesta_id', t: 'Respuesta', f: 'int' }, { k: 'formulario', t: 'Formulario' }, { k: 'origen', t: 'Origen' },
    { k: 'fecha', t: 'Fecha' }, { k: 'empresa', t: 'Empresa' }, { k: 'sector', t: 'Sector' },
    { k: 'pregunta_num', t: 'N.º', f: 'int' }, { k: 'pregunta', t: 'Pregunta', ancho: 70 },
    { k: 'tipo_respuesta', t: 'Tipo de pregunta' }, { k: 'dimension', t: 'Dimensión' }, { k: 'respuesta', t: 'Respuesta', ancho: 60 }
  ]
};

/* ===================================================================
   Utilidades
   =================================================================== */
const num = v => (v === null || v === undefined || v === '' ? null : Number(v));
const promedio = arr => { const v = arr.map(num).filter(x => x !== null && !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
const redondear = (v, d) => (v === null ? null : Math.round(v * 10 ** d) / 10 ** d);
const FORMATOS = {
  int: v => Math.round(v).toLocaleString('es-GT'),
  dec1: v => v.toLocaleString('es-GT', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  dec2: v => v.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  pct: v => v.toLocaleString('es-GT', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %',
  auto: v => (Number.isInteger(v) ? FORMATOS.int(v) : FORMATOS.dec2(v))
};
function fmt(v, f) {
  if (f === 'bool') return v === true ? 'Sí' : v === false ? 'No' : '—';
  const n = num(v);
  if (n === null || Number.isNaN(n)) return '—';
  return (FORMATOS[f] || FORMATOS.auto)(n);
}
function partir(texto, ancho) {
  const palabras = String(texto).split(' '); const lineas = []; let actual = '';
  for (const p of palabras) {
    if ((actual + ' ' + p).trim().length > ancho && actual) { lineas.push(actual); actual = p; } else { actual = (actual + ' ' + p).trim(); }
  }
  if (actual) lineas.push(actual);
  return lineas;
}
function agrupar(filas, clave) {
  const m = new Map();
  for (const f of filas) { const k = clave(f); if (!m.has(k)) m.set(k, []); m.get(k).push(f); }
  return m;
}
class ErrorApi extends Error {
  constructor(etapa, estado, cuerpo, vista) { super(cuerpo); this.etapa = etapa; this.estado = estado; this.cuerpo = cuerpo || ''; this.vista = vista; }
}

/* ===================================================================
   Plugins de Chart.js: fondo (para exportar) y etiquetas de valor
   =================================================================== */
const pluginFondo = {
  id: 'fondo',
  beforeDraw(chart, args, o) {
    if (!o || !o.color) return;
    const { ctx, width, height } = chart;
    ctx.save(); ctx.fillStyle = o.color; ctx.fillRect(0, 0, width, height); ctx.restore();
  }
};
const pluginEtiquetas = {
  id: 'etiquetas',
  afterDatasetsDraw(chart, args, o) {
    if (!o || !o.mostrar) return;
    const { ctx } = chart;
    const horizontal = chart.options.indexAxis === 'y';
    ctx.save();
    ctx.font = '500 11px ' + FUENTE;
    ctx.fillStyle = o.color;
    chart.data.datasets.forEach((ds, i) => {
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden || meta.type !== 'bar') return;
      meta.data.forEach((el, j) => {
        const v = ds.data[j];
        if (v === null || v === undefined || v === 0 && o.ocultarCeros) return;
        const txt = fmt(v, o.formato);
        if (horizontal) { ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(txt, el.x + 6, el.y); }
        else { ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText(txt, el.x, el.y - 4); }
      });
    });
    ctx.restore();
  }
};
Chart.register(pluginFondo, pluginEtiquetas);
Chart.defaults.font.family = FUENTE;
Chart.defaults.font.size = 12;

/* ===================================================================
   Componente de tabla (Options API)
   =================================================================== */
const TablaDatos = {
  name: 'TablaDatos',
  props: { nombre: String, columnas: Array, filas: Array },
  emits: ['exportar'],
  data() { return { q: '', orden: null, asc: true, pagina: 1, porPagina: 25 }; },
  computed: {
    filtradas() {
      const q = this.q.trim().toLowerCase();
      if (!q) return this.filas;
      return this.filas.filter(f => this.columnas.some(c => String(f[c.k] ?? '').toLowerCase().includes(q)));
    },
    ordenadas() {
      if (!this.orden) return this.filtradas;
      const c = this.columnas.find(x => x.k === this.orden);
      const numerica = c && ['int', 'dec1', 'dec2'].includes(c.f);
      const s = this.asc ? 1 : -1;
      return [...this.filtradas].sort((a, b) => {
        const x = a[this.orden], y = b[this.orden];
        if (x === null || x === undefined) return 1;
        if (y === null || y === undefined) return -1;
        return numerica ? (Number(x) - Number(y)) * s : String(x).localeCompare(String(y), 'es') * s;
      });
    },
    paginas() { return Math.max(1, Math.ceil(this.ordenadas.length / this.porPagina)); },
    visibles() { const i = (this.pagina - 1) * this.porPagina; return this.ordenadas.slice(i, i + this.porPagina); }
  },
  watch: { filas() { this.pagina = 1; }, q() { this.pagina = 1; } },
  methods: {
    ordenar(k) { if (this.orden === k) this.asc = !this.asc; else { this.orden = k; this.asc = true; } },
    celda(f, c) { const v = f[c.k]; if ((v === null || v === undefined || v === '') && c.vacio) return c.vacio; return c.f ? fmt(v, c.f) : (v ?? '—'); },
    esNum(c) { return ['int', 'dec1', 'dec2'].includes(c.f); },
    exportar() { this.$emit('exportar', { nombre: this.nombre, columnas: this.columnas, filas: this.ordenadas }); }
  },
  template: `
    <div>
      <div class="barra">
        <input type="search" v-model="q" placeholder="Buscar en la tabla…" aria-label="Buscar">
        <div class="acciones">
          <span class="estado">{{ filtradas.length.toLocaleString('es-GT') }} filas</span>
          <button class="btn" @click="exportar">Exportar tabla a Excel</button>
        </div>
      </div>
      <div class="tabla-caja">
        <table>
          <thead><tr>
            <th v-for="c in columnas" :key="c.k" :class="{ num: esNum(c) }" @click="ordenar(c.k)" :aria-sort="orden === c.k ? (asc ? 'ascending' : 'descending') : 'none'">
              {{ c.t }}<span v-if="orden === c.k">{{ asc ? ' ▲' : ' ▼' }}</span>
            </th>
          </tr></thead>
          <tbody>
            <tr v-for="(f, i) in visibles" :key="i">
              <td v-for="c in columnas" :key="c.k" :class="{ num: esNum(c) }">
                <span v-if="c.k === 'origen' || c.k.startsWith('origen_')" class="etq" :class="{ real: f[c.k] === 'real' }">{{ f[c.k] ?? '—' }}</span>
                <template v-else>{{ celda(f, c) }}</template>
              </td>
            </tr>
            <tr v-if="!visibles.length"><td :colspan="columnas.length">Sin filas para estos filtros.</td></tr>
          </tbody>
        </table>
      </div>
      <div class="paginacion">
        <button class="btn mini" :disabled="pagina <= 1" @click="pagina--">Anterior</button>
        <span>Página {{ pagina }} de {{ paginas }}</span>
        <button class="btn mini" :disabled="pagina >= paginas" @click="pagina++">Siguiente</button>
      </div>
    </div>`
};

/* ===================================================================
   Aplicación (Options API)
   =================================================================== */
const app = Vue.createApp({
  components: { TablaDatos },
  data() {
    return {
      config: { ...CONFIG_DEFECTO },
      verConexion: false,
      diagnostico: [],
      avisos: [],
      copiado: false,
      conectado: false,
      cargando: false,
      exportando: false,
      error: null,
      ultimaCarga: null,
      datos: Vue.markRaw({ resumen: [], iso: [], impacto: [], ficha: [], tipos: [], likert: [], detalle: [] }),
      filtros: { origen: 'todos', grupo: '', sector: '', tamano: '', iso: '' },
      opcionesOrigen: [{ v: 'todos', t: 'Todos' }, { v: 'real', t: 'Reales' }, { v: 'simulado', t: 'Simulados' }],
      pestanas: [
        { k: 'resumen', t: 'Resumen y gráficas' }, { k: 'empresas', t: 'Empresas' }, { k: 'iso', t: 'Adopción ISO' },
        { k: 'incidentes', t: 'Incidentes' }, { k: 'detalle', t: 'Preguntas y respuestas' },
        { k: 'preguntas', t: 'Respuestas por pregunta' }
      ],
      pestana: 'resumen',
      formularioDetalle: '',
      formularioPreguntas: 'FICHA',
      formulariosUI: FORMULARIOS_UI,
      tiposPregunta: TIPOS_PREGUNTA,
      preguntasAbiertas: {},
      tablasAbiertas: {},
      graficas: GRAFICAS,
      columnas: COLUMNAS,
      modoOscuro: false
    };
  },
  computed: {
    textoEstado() {
      if (this.cargando) return 'Cargando datos…';
      if (!this.conectado) return 'Sin conexión';
      return 'Conectado · ' + this.ultimaCarga;
    },
    opciones() {
      const r = this.datos.resumen;
      const uniq = a => [...new Set(a.filter(Boolean))].sort((x, y) => x.localeCompare(y, 'es'));
      return {
        grupos: uniq(r.map(x => x.grupo_sector)),
        sectores: uniq(r.filter(x => !this.filtros.grupo || x.grupo_sector === this.filtros.grupo).map(x => x.sector)),
        tamanos: uniq(r.map(x => x.tamano)),
        iso: ['Si', 'Si - alcance por confirmar', 'No encontrada']
      };
    },
    resumenF() { return this.filtrar(this.datos.resumen, true); },
    isoF() { return this.filtrar(this.datos.iso); },
    impactoF() { return this.filtrar(this.datos.impacto); },
    fichaF() { return this.filtrar(this.datos.ficha); },
    tiposF() { const ids = new Set(this.fichaF.map(f => f.respuesta_id)); return this.datos.tipos.filter(t => ids.has(t.respuesta_id)); },
    likertF() { return this.filtrar(this.datos.likert); },
    detalleF() { return this.filtrar(this.datos.detalle); },
    resumenPreguntas() { return resumirPreguntas(this.detalleF, this.formularioPreguntas); },
    respuestasFormulario() { return new Set(this.detalleF.filter(d => d.formulario === this.formularioPreguntas).map(d => d.respuesta_id)).size; },
    detalleTabla() { return this.formularioDetalle ? this.detalleF.filter(d => d.formulario === this.formularioDetalle) : this.detalleF; },
    incluyeSimulados() {
      return this.filtros.origen !== 'real' && [this.isoF, this.impactoF, this.fichaF].some(a => a.some(r => r.origen === 'simulado'));
    },
    kpis() {
      const resp = [...this.isoF, ...this.impactoF, ...this.fichaF];
      const empresas = new Set(resp.filter(r => r.empresa_id !== null && r.empresa_id !== undefined).map(r => r.empresa_id));
      const anon = resp.filter(r => r.empresa_id === null || r.empresa_id === undefined).length;
      const reales = resp.filter(r => r.origen === 'real').length;
      const indice = promedio(this.isoF.map(r => r.indice_adopcion_pct));
      const promIso = promedio(this.isoF.map(r => r.promedio_total));
      const nivel = promIso === null ? '—' : NIVELES[Math.min(4, Math.max(0, Math.floor((promIso - 1) / 0.8)))].slice(4);
      const pctSi = arr => (arr.length ? (100 * arr.filter(Boolean).length) / arr.length : null);
      return [
        { et: 'Empresas', val: fmt(empresas.size, 'int') },
        { et: 'Respuestas', val: fmt(resp.length, 'int') },
        { et: 'Índice de adopción ISO', val: fmt(indice, 'pct'), det: 'nivel promedio: ' + nivel },
        { et: 'Incidentes por ficha', val: fmt(promedio(this.fichaF.map(r => r.total_incidentes)), 'dec1'), det: 'promedio, últimos 12 meses' },
        { et: 'Recuperación promedio', val: this.fichaF.length ? fmt(promedio(this.fichaF.map(r => r.tiempo_recuperacion_h)), 'dec1') + ' h' : '—', det: 'por incidente' },
        { et: 'Con registro formal', val: fmt(pctSi(this.fichaF.map(r => r.registro_formal)), 'pct'), det: 'acciones correctivas: ' + fmt(pctSi(this.fichaF.map(r => r.acciones_correctivas)), 'pct') }
      ];
    },
    datosGraficas() {
      const d = {};
      // 1. Adopción por sector
      const porSector = [...agrupar(this.isoF, r => r.sector || 'Sin empresa (anónima)')]
        .map(([s, rs]) => ({ s, v: redondear(promedio(rs.map(r => r.indice_adopcion_pct)), 1), n: rs.length }))
        .sort((a, b) => b.v - a.v);
      d.adopcionSector = {
        tipo: 'barras', horizontal: true, formato: 'pct', max: 100,
        labels: porSector.map(x => x.s), series: [{ nombre: 'Índice de adopción', valores: porSector.map(x => x.v) }],
        tabla: { cab: ['Sector', 'Índice de adopción (%)', 'Respuestas'], filas: porSector.map(x => [x.s, x.v, x.n]) }
      };
      // 2. Nivel de madurez (rampa ordinal)
      const conteoNivel = NIVELES.map(nv => this.isoF.filter(r => r.nivel_madurez === nv).length);
      d.nivelMadurez = {
        tipo: 'barras', formato: 'int', entero: true, ordinal: true,
        labels: NIVELES.map(n => n.slice(4)), series: [{ nombre: 'Respuestas', valores: conteoNivel }],
        tabla: { cab: ['Nivel de madurez', 'Respuestas'], filas: NIVELES.map((n, i) => [n, conteoNivel[i]]) }
      };
      // 3. Dimensiones
      const dims = DIMENSIONES.map(([k, t]) => [t, redondear(promedio(this.isoF.map(r => r[k])), 2)]);
      d.dimensiones = {
        tipo: 'barras', formato: 'dec2', max: 5,
        labels: dims.map(x => x[0]), series: [{ nombre: 'Promedio (1–5)', valores: dims.map(x => x[1]) }],
        tabla: { cab: ['Dimensión', 'Promedio (1–5)'], filas: dims }
      };
      // 4. Requisitos ISO
      const lIso = this.likertF.filter(r => r.formulario === 'ISO');
      const req = [...agrupar(lIso, r => r.pregunta_num)]
        .map(([n, rs]) => ({ n: Number(n), ref: rs[0].referencia_iso, v: redondear(promedio(rs.map(r => r.valor)), 2) }))
        .sort((a, b) => a.v - b.v || a.n - b.n);
      d.requisitos = {
        tipo: 'barras', horizontal: true, formato: 'dec2', max: 5,
        labels: req.map(x => `${CORTAS_ISO[x.n] || 'P' + x.n} (${x.ref})`), series: [{ nombre: 'Promedio (1–5)', valores: req.map(x => x.v) }],
        tabla: { cab: ['Pregunta', 'Requisito', 'Referencia ISO', 'Promedio (1–5)'], filas: req.map(x => ['P' + x.n, CORTAS_ISO[x.n], x.ref, x.v]) }
      };
      // 5. Tipos de incidente
      const tipos = [...agrupar(this.tiposF, r => r.tipo_incidente)].map(([t, rs]) => ({ t, n: rs.length })).sort((a, b) => b.n - a.n);
      d.tiposIncidente = {
        tipo: 'barras', horizontal: true, formato: 'int', entero: true,
        labels: tipos.map(x => CORTAS_INCIDENTE[x.t] || x.t), series: [{ nombre: 'Fichas', valores: tipos.map(x => x.n) }],
        tabla: { cab: ['Tipo de incidente', 'Fichas'], filas: tipos.map(x => [x.t, x.n]) }
      };
      // 6. Impacto económico
      const porRango = [1, 2, 3, 4, 5, 6, 7].map(o => this.fichaF.filter(r => Number(r.impacto_orden) === o));
      d.impactoEconomico = {
        tipo: 'barras', formato: 'int', entero: true, ultimoNeutro: true,
        labels: RANGOS_CORTOS, series: [{ nombre: 'Fichas', valores: porRango.map(a => a.length) }],
        tabla: { cab: ['Rango', 'Fichas'], filas: porRango.map((a, i) => [a[0]?.impacto_economico || RANGOS_CORTOS[i], a.length]) }
      };
      // 7. Dispersión adopción vs incidentes
      const o = this.filtros.origen;
      const puntos = this.resumenF
        .filter(r => r.iso_promedio !== null && r.total_incidentes !== null && (o === 'todos' || (r.origen_iso === o && r.origen_ficha === o)))
        .map(r => ({ x: Number(r.iso_promedio), y: Number(r.total_incidentes), nombre: r.empresa }));
      d.adopcionVsIncidentes = {
        tipo: 'dispersion', puntos,
        tabla: { cab: ['Empresa', 'Adopción ISO (1–5)', 'Incidentes 12 meses'], filas: puntos.map(p => [p.nombre, p.x, p.y]) }
      };
      // 8. Percepción de impacto (real vs simulado)
      const lImp = this.likertF.filter(r => r.formulario === 'IMPACTO');
      const origenes = ['real', 'simulado'].filter(x => lImp.some(r => r.origen === x));
      const preguntas = [1, 2, 3, 4, 5, 6];
      const series = origenes.map(org => ({
        nombre: org === 'real' ? 'Reales' : 'Simuladas', entidad: org,
        valores: preguntas.map(n => redondear(promedio(lImp.filter(r => r.origen === org && Number(r.pregunta_num) === n).map(r => r.valor)), 2))
      }));
      d.percepcionImpacto = {
        tipo: 'barras', formato: 'dec2', max: 5,
        labels: preguntas.map(n => CORTAS_IMPACTO[n]), series,
        tabla: { cab: ['Pregunta', ...series.map(s => s.nombre)], filas: preguntas.map((n, i) => [CORTAS_IMPACTO[n], ...series.map(s => s.valores[i])]) }
      };
      return d;
    },
    textoFiltros() {
      const f = this.filtros;
      return [
        'Origen: ' + this.opcionesOrigen.find(o => o.v === f.origen).t, 'Grupo: ' + (f.grupo || 'Todos'), 'Sector: ' + (f.sector || 'Todos'),
        'Tamaño: ' + (f.tamano || 'Todos'), 'ISO 27001 pública: ' + (f.iso || 'Todas')
      ].join(' · ');
    }
  },
  watch: {
    datosGraficas() { this.$nextTick(this.dibujarGraficas); },
    pestana(v) { if (v === 'resumen') this.$nextTick(this.dibujarGraficas); },
    'filtros.grupo'() { if (this.filtros.sector && !this.opciones.sectores.includes(this.filtros.sector)) this.filtros.sector = ''; },
    config: { deep: true, handler(c) { try { localStorage.setItem(CLAVE_LOCAL, JSON.stringify({ apiUrl: c.apiUrl, authUrl: c.authUrl })); } catch (e) { /* sin almacenamiento */ } } }
  },
  created() {
    this.$_graficos = {};
    this.$_token = null;
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE_LOCAL) || 'null');
      if (g && g.apiUrl) { this.config.apiUrl = g.apiUrl; this.config.authUrl = g.authUrl || ''; }
    } catch (e) { /* sin almacenamiento */ }
  },
  mounted() {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    this.modoOscuro = mq.matches;
    mq.addEventListener('change', e => { this.modoOscuro = e.matches; this.dibujarGraficas(); });
    this.cargarConfiguracion();
  },
  methods: {
    fmt,
    filtrar(filas, esResumen) {
      const f = this.filtros;
      return filas.filter(r => {
        if (f.origen !== 'todos') {
          if (esResumen) { if (![r.origen_ficha, r.origen_iso, r.origen_impacto].includes(f.origen)) return false; }
          else if (r.origen !== f.origen) return false;
        }
        if (f.grupo && r.grupo_sector !== f.grupo) return false;
        if (f.sector && r.sector !== f.sector) return false;
        if (f.tamano && r.tamano !== f.tamano) return false;
        if (f.iso && r.iso27001_publica !== f.iso) return false;
        return true;
      });
    },
    limpiarFiltros() { this.filtros = { origen: 'todos', grupo: '', sector: '', tamano: '', iso: '' }; },
    togglePregunta(n) {
      const k = this.formularioPreguntas + n;
      this.preguntasAbiertas = { ...this.preguntasAbiertas, [k]: !this.preguntasAbiertas[k] };
    },
    /* Hoja de Excel: una fila por opción de cada pregunta */
    hojaPreguntas(wb, formularios) {
      const ws = wb.addWorksheet('Respuestas por pregunta', { views: [{ state: 'frozen', ySplit: 1 }] });
      ws.columns = [
        { header: 'Formulario', key: 'formulario', width: 24 }, { header: 'N.º', key: 'num', width: 6 },
        { header: 'Pregunta', key: 'pregunta', width: 60 }, { header: 'Tipo', key: 'tipo', width: 16 },
        { header: 'Respuestas', key: 'n', width: 11 }, { header: 'Opción', key: 'opcion', width: 40 },
        { header: 'Cantidad', key: 'cantidad', width: 10 }, { header: '% de respuestas', key: 'pct', width: 15 },
        { header: 'Promedio', key: 'promedio', width: 10 }, { header: 'Mediana', key: 'mediana', width: 10 }
      ];
      for (const f of formularios) {
        for (const p of resumirPreguntas(this.detalleF, f.v)) {
          p.opciones.forEach((o, i) => ws.addRow({
            formulario: f.t, num: p.num, pregunta: p.texto, tipo: TIPOS_PREGUNTA[p.tipo] || p.tipo, n: p.n,
            opcion: o.etiqueta, cantidad: o.cantidad, pct: Math.round(o.pct * 10) / 10,
            promedio: i === 0 && p.stats && p.stats.n ? Math.round(p.stats.promedio * 100) / 100 : null,
            mediana: i === 0 && p.stats && p.stats.n ? p.stats.mediana : null
          }));
        }
      }
      ws.getColumn('pct').numFmt = '0.0';
      ws.getColumn('promedio').numFmt = '0.00';
      ws.getColumn('pregunta').alignment = { wrapText: true, vertical: 'top' };
      this.estiloCabecera(ws.getRow(1));
      ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 10 } };
    },
    async exportarPreguntas() {
      this.exportando = true; this.error = null;
      try {
        const wb = this.nuevoLibro();
        const f = FORMULARIOS_UI.find(x => x.v === this.formularioPreguntas);
        this.hojaPreguntas(wb, [f]);
        this.hojaDatos(wb, 'Respuestas individuales', COLUMNAS.detalle, this.detalleF.filter(d => d.formulario === f.v));
        await this.guardarLibro(wb, 'Respuestas_por_pregunta_' + f.v);
      } catch (e) {
        this.error = { titulo: 'No se pudo exportar. ', detalle: String(e && e.message || e) };
      } finally {
        this.exportando = false;
      }
    },
    toggleTabla(k) { this.tablasAbiertas = { ...this.tablasAbiertas, [k]: !this.tablasAbiertas[k] }; },

    async cargarConfiguracion() {
      try {
        const r = await fetch('/config.json', { cache: 'no-store' });
        if (!r.ok) throw new Error('Configuración no disponible');
        const c = await r.json();
        if (c.apiUrl) this.config.apiUrl = c.apiUrl;
        if (c.authUrl) this.config.authUrl = c.authUrl;
        if (this.config.apiUrl) await this.conectar();
      } catch (e) {
        this.verConexion = true;
        this.avisos.push('Inicia el servidor con python3 scripts/serve.py o configura la conexión manualmente.');
      }
    },
    /* ---------- Conexión ---------- */
    async obtenerToken(forzar) {
      if (this.config.token) return this.config.token;
      if (!this.config.authUrl) return null;
      if (!forzar && this.$_token && this.$_token.exp > Date.now() + 60000) return this.$_token.valor;
      const url = this.config.authUrl.replace(/\/+$/, '') + '/token/anonymous';
      let r;
      try { r = await fetch(url, { method: 'GET' }); }
      catch (e) { throw new ErrorApi('auth', 0, e.message); }
      if (!r.ok) throw new ErrorApi('auth', r.status, await r.text());
      const j = await r.json();
      let exp = Number(j.expires_at) || 0;
      if (exp && exp < 1e12) exp *= 1000;
      this.$_token = { valor: j.token, exp: exp || Date.now() + 10 * 60000 };
      return j.token;
    },
    async pedir(url, vista, reintento) {
      const token = await this.obtenerToken(false);
      const headers = { Accept: 'application/json' };
      if (token) headers.Authorization = 'Bearer ' + token;
      let r;
      try { r = await fetch(url, { headers }); }
      catch (e) { throw new ErrorApi('api', 0, e.message, vista); }
      if (r.status === 401 && !reintento && !this.config.token && this.config.authUrl) {
        this.$_token = null;
        return this.pedir(url, vista, true);
      }
      if (!r.ok) throw new ErrorApi('api', r.status, await r.text(), vista);
      return r.json();
    },
    async leerVista(vista, orden, select) {
      const base = this.config.apiUrl.replace(/\/+$/, '');
      const tam = 1000; const todas = [];
      // Se ordena siempre para que la paginación (limit/offset) sea estable
      for (let offset = 0; ; offset += tam) {
        const url = `${base}/${vista}?select=${select || '*'}&order=${orden}&limit=${tam}&offset=${offset}`;
        const lote = await this.pedir(url, vista, false);
        todas.push(...lote);
        if (lote.length < tam) break;
      }
      return todas;
    },
    async conectar() {
      if (!this.config.apiUrl) { this.error = { titulo: 'Falta la URL de la Data API.', detalle: '' }; return; }
      try {
        for (const valor of [this.config.apiUrl, this.config.authUrl].filter(Boolean)) {
          const u = new URL(valor);
          if (u.protocol !== 'https:' || u.username || u.password) throw new Error();
        }
      } catch (e) {
        this.error = { titulo: 'URL no válida.', detalle: 'Usa direcciones HTTPS sin credenciales en la URL.' };
        return;
      }
      this.cargando = true; this.error = null; this.avisos = [];
      const diag = [];
      try {
        try {
          await this.obtenerToken(true);
          diag.push({ paso: 'Token (Neon Auth)', ok: true, info: this.config.token ? 'Se usa el token pegado' : (this.config.authUrl ? 'Token anónimo obtenido' : 'Sin token') });
        } catch (e) {
          const x = this.explicarError(e);
          diag.push({ paso: 'Token (Neon Auth)', ok: false, info: x.titulo + x.detalle });
          throw e;
        }
        // Cada vista se lee por separado: si falla una opcional, el tablero sigue funcionando
        const vistas = [
          { clave: 'resumen', vista: 'v_empresa_resumen', orden: 'empresa.asc' },
          { clave: 'iso', vista: 'v_iso_adopcion', orden: 'respuesta_id.asc' },
          { clave: 'impacto', vista: 'v_impacto_competitividad', orden: 'respuesta_id.asc' },
          { clave: 'ficha', vista: 'v_ficha_incidentes', orden: 'respuesta_id.asc' },
          { clave: 'tipos', vista: 'v_ficha_tipos_incidente', orden: 'respuesta_id.asc,tipo_incidente.asc' },
          { clave: 'likert', vista: 'v_likert_detalle', orden: 'respuesta_id.asc,pregunta_num.asc',
            select: 'respuesta_id,formulario,origen,empresa_id,empresa,sector,grupo_sector,tamano,iso27001_publica,pregunta_num,pregunta,dimension,referencia_iso,valor' },
          { clave: 'detalle', vista: 'v_respuestas_detalle', orden: 'respuesta_id.asc,pregunta_num.asc', opcional: true }
        ];
        const res = await Promise.allSettled(vistas.map(v => this.leerVista(v.vista, v.orden, v.select)));
        const datos = {}; let primerError = null;
        res.forEach((r, i) => {
          const v = vistas[i];
          if (r.status === 'fulfilled') {
            datos[v.clave] = r.value;
            diag.push({ paso: v.vista, ok: true, info: r.value.length.toLocaleString('es-GT') + ' filas' });
          } else {
            const x = this.explicarError(r.reason);
            diag.push({ paso: v.vista, ok: false, opcional: v.opcional, info: x.titulo + x.detalle });
            if (!v.opcional && !primerError) primerError = r.reason;
          }
        });
        if (primerError) throw primerError;
        if (!datos.detalle) {
          datos.detalle = this.armarDetalle(datos);
          //this.avisos.push('La vista v_respuestas_detalle no está disponible en la Data API, así que el detalle de preguntas y respuestas se armó con las otras vistas. Todo funciona igual.');
        }
        this.datos = Vue.markRaw(datos);
        this.conectado = true; this.verConexion = false;
        this.ultimaCarga = new Date().toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        this.error = this.explicarError(e);
        this.verConexion = true;
        if (!this.datos.resumen.length) this.conectado = false;
      } finally {
        this.diagnostico = diag;
        this.cargando = false;
      }
    },
    /* Arma el detalle pregunta/respuesta en el navegador cuando la vista no existe */
    armarDetalle(d) {
      const siNo = v => (v === true ? 'Si' : v === false ? 'No' : null);
      const tiposPor = agrupar(d.tipos, t => t.respuesta_id);
      const filas = [];
      for (const f of d.ficha) {
        const base = {
          respuesta_id: f.respuesta_id, formulario: 'FICHA', origen: f.origen, fecha: f.fecha, empresa_id: f.empresa_id,
          empresa: f.empresa, sector: f.sector, grupo_sector: f.grupo_sector, tamano: f.tamano, iso27001_publica: f.iso27001_publica
        };
        const ordenCat = Object.keys(CORTAS_INCIDENTE);
        const tipos = (tiposPor.get(f.respuesta_id) || []).map(t => t.tipo_incidente)
          .sort((x, y) => ordenCat.indexOf(x) - ordenCat.indexOf(y)).join('; ');
        const resp = [f.empresa, f.tamano, f.tipo_servicio, f.total_incidentes, tipos, f.impacto_economico,
          f.tiempo_recuperacion_h, siNo(f.registro_formal), siNo(f.acciones_correctivas), siNo(f.incidentes_disminuyeron)];
        PREGUNTAS_FICHA.forEach(([n, texto, tipo, dim], i) => filas.push({
          ...base, pregunta_num: n, pregunta: texto, tipo_respuesta: tipo, dimension: dim,
          respuesta: resp[i] === null || resp[i] === undefined ? null : String(resp[i])
        }));
      }
      for (const l of d.likert) {
        filas.push({
          respuesta_id: l.respuesta_id, formulario: l.formulario, origen: l.origen, fecha: null, empresa_id: l.empresa_id,
          empresa: l.empresa ?? '(anónima)', sector: l.sector, grupo_sector: l.grupo_sector, tamano: l.tamano,
          iso27001_publica: l.iso27001_publica, pregunta_num: l.pregunta_num, pregunta: l.pregunta,
          tipo_respuesta: 'likert', dimension: l.dimension, respuesta: String(l.valor)
        });
      }
      return filas.sort((a, b) => a.respuesta_id - b.respuesta_id || a.pregunta_num - b.pregunta_num);
    },
    async copiarDiagnostico() {
      const texto = this.diagnostico.map(d => `${d.paso}\t${d.ok ? 'OK' : 'ERROR'}\t${d.info}`).join('\n');
      try { await navigator.clipboard.writeText(texto); this.copiado = true; setTimeout(() => { this.copiado = false; }, 2000); }
      catch (e) { window.prompt('Copia el diagnóstico:', texto); }
    },
    explicarError(e) {
      const cuerpo = (e.cuerpo || '').slice(0, 300);
      if (e.etapa === 'auth') {
        return {
          titulo: 'No se pudo obtener el token anónimo de Neon Auth. ',
          detalle: e.estado
            ? `Respuesta ${e.estado}: ${cuerpo}. Verifica la URL en Neon → Auth → Configuración y que Neon Auth esté habilitado.`
            : 'Revisa la URL de Neon Auth (cópiala exacta desde Neon → Auth) y que abriste la página desde http://localhost.'
        };
      }
      if (!(e instanceof ErrorApi)) return { titulo: 'Error inesperado. ', detalle: String(e && e.message || e) };
      if (e.estado === 0) return { titulo: 'No se pudo conectar con la Data API (red o CORS). ', detalle: 'Abre la página desde http://localhost y, si persiste, agrega ese origen en Neon → Data API → Settings → CORS.' };
      if (e.estado === 401) return { titulo: 'La Data API pidió autenticación (401). ', detalle: 'Revisa la URL de Neon Auth o pega un token JWT válido. ' + cuerpo };
      if (e.estado === 403 || /42501|permission denied/i.test(cuerpo)) return { titulo: `Permiso denegado en ${e.vista}. `, detalle: 'Ejecuta en Neon el bloque de permisos (GRANT) del script iso27001_guatemala.sql. ' + cuerpo };
      if (e.estado === 404 || /PGRST205|42P01|does not exist|schema cache/i.test(cuerpo)) return { titulo: `No se encontró la vista ${e.vista}. `, detalle: 'Vuelve a ejecutar el script actualizado y refresca el caché de esquema en Neon → Data API. ' + cuerpo };
      return { titulo: `Error ${e.estado} al leer ${e.vista}. `, detalle: cuerpo };
    },

    /* ---------- Gráficas ---------- */
    tema(exportar) { return exportar || !this.modoOscuro ? TEMAS.claro : TEMAS.oscuro; },
    alturaGrafica(k) {
      const d = this.datosGraficas[k];
      if (d && d.horizontal) return Math.max(220, d.labels.length * 30 + 56);
      return 300;
    },
    graficaVacia(k) {
      const d = this.datosGraficas[k];
      if (!d) return true;
      if (d.tipo === 'dispersion') return !d.puntos.length;
      return !d.labels.length || d.series.every(s => s.valores.every(v => !v));
    },
    configDe(k, exportar) {
      const d = JSON.parse(JSON.stringify(this.datosGraficas[k]));
      const T = this.tema(exportar);
      const fuente = { family: FUENTE, size: 12 };
      const tooltip = {
        backgroundColor: T.surface, borderColor: T.borde, borderWidth: 1, titleColor: T.ink2, bodyColor: T.ink,
        titleFont: { family: FUENTE, size: 12, weight: '400' }, bodyFont: { family: FUENTE, size: 13, weight: '600' },
        padding: 10, cornerRadius: 6, boxWidth: 12, boxHeight: 2, caretSize: 5
      };
      const base = {
        responsive: !exportar, maintainAspectRatio: false, animation: false,
        devicePixelRatio: exportar ? 2 : undefined
      };
      if (d.tipo === 'dispersion') {
        return {
          type: 'scatter',
          data: { datasets: [{ label: 'Empresas', data: d.puntos, backgroundColor: T.s1, borderColor: T.surface, borderWidth: 2, pointRadius: 5, pointHoverRadius: 7, pointHitRadius: 12 }] },
          options: {
            ...base, layout: { padding: { top: 8, right: 12 } },
            plugins: {
              legend: { display: false }, fondo: { color: exportar ? T.surface : null }, etiquetas: { mostrar: false },
              tooltip: { ...tooltip, displayColors: false, callbacks: { title: it => it[0].raw.nombre, label: c => `${fmt(c.parsed.x, 'dec2')} adopción · ${fmt(c.parsed.y, 'int')} incidentes` } }
            },
            scales: {
              x: { min: 1, max: 5, grid: { color: T.grid }, border: { color: T.base }, ticks: { color: T.muted, font: fuente }, title: { display: true, text: 'Adopción ISO (1–5)', color: T.muted, font: fuente } },
              y: { beginAtZero: true, grid: { color: T.grid }, border: { display: false }, ticks: { color: T.muted, font: fuente, precision: 0 }, title: { display: true, text: 'Incidentes (12 meses)', color: T.muted, font: fuente } }
            }
          }
        };
      }
      const horizontal = !!d.horizontal;
      const multi = d.series.length > 1;
      const datasets = d.series.map((s, i) => {
        let color = s.entidad === 'simulado' ? T.s2 : (s.entidad === 'real' ? T.s1 : (i === 0 ? T.s1 : T.s2));
        let colores = color;
        if (d.ordinal) colores = T.rampa;
        if (d.ultimoNeutro) colores = s.valores.map((v, j) => (j === s.valores.length - 1 ? T.na : color));
        return {
          label: s.nombre, data: s.valores, backgroundColor: colores,
          hoverBackgroundColor: Array.isArray(colores) ? colores.map(c => c + 'd9') : colores + 'd9',
          borderRadius: 4, borderSkipped: 'start', maxBarThickness: 24,
          categoryPercentage: multi ? 0.72 : 0.8, barPercentage: multi ? 0.9 : 0.85
        };
      });
      const labels = horizontal ? d.labels : d.labels.map(l => partir(l, 13));
      const ejeValor = {
        beginAtZero: true, max: d.max, grid: { color: T.grid, lineWidth: 1, drawTicks: false }, border: { display: false },
        ticks: { color: T.muted, font: fuente, padding: 6, maxTicksLimit: 6, precision: d.entero ? 0 : undefined }
      };
      const ejeCat = {
        grid: { display: false }, border: { color: T.base },
        ticks: { color: T.ink2, autoSkip: false, maxRotation: 0, font: c => ({ family: FUENTE, size: c.chart.width < 440 ? 10 : 12 }) }
      };
      if (horizontal) {
        // En pantallas angostas se recortan las etiquetas largas; el tooltip y la tabla muestran el texto completo
        ejeCat.ticks.callback = function (v) {
          const l = String(this.getLabelForValue(v));
          const max = this.chart.width < 480 ? 18 : 40;
          return l.length > max ? l.slice(0, max - 1) + '…' : l;
        };
      }
      return {
        type: 'bar',
        data: { labels, datasets },
        options: {
          ...base, indexAxis: horizontal ? 'y' : 'x',
          layout: { padding: { top: horizontal ? 4 : 20, right: horizontal ? 52 : 8, left: 2, bottom: 2 } },
          plugins: {
            legend: { display: multi, position: 'top', align: 'start', labels: { color: T.ink2, font: fuente, boxWidth: 12, boxHeight: 12 } },
            fondo: { color: exportar ? T.surface : null },
            etiquetas: { mostrar: !multi, formato: d.formato, color: T.ink2 },
            tooltip: {
              ...tooltip, displayColors: multi,
              callbacks: { label: c => `${fmt(horizontal ? c.parsed.x : c.parsed.y, d.formato)}${multi ? '  ' + c.dataset.label : ''}` }
            }
          },
          scales: horizontal ? { x: ejeValor, y: ejeCat } : { x: ejeCat, y: ejeValor }
        }
      };
    },
    dibujarGraficas() {
      if (!this.conectado || this.pestana !== 'resumen') return;
      for (const g of GRAFICAS) {
        const canvas = document.getElementById('cv-' + g.key);
        if (!canvas) continue;
        if (this.$_graficos[g.key]) { this.$_graficos[g.key].destroy(); delete this.$_graficos[g.key]; }
        if (this.graficaVacia(g.key)) { const c = canvas.getContext('2d'); c.clearRect(0, 0, canvas.width, canvas.height); continue; }
        this.$_graficos[g.key] = new Chart(canvas, this.configDe(g.key, false));
      }
    },
    /* Renderiza la gráfica en tema claro fuera de pantalla y devuelve un PNG (data URL) */
    async pngDe(k) {
      if (this.graficaVacia(k)) return null;
      const ancho = 720, alto = this.alturaGrafica(k);
      const zona = document.getElementById('zona-export');
      const canvas = document.createElement('canvas');
      canvas.width = ancho; canvas.height = alto;
      canvas.style.width = ancho + 'px'; canvas.style.height = alto + 'px';
      zona.appendChild(canvas);
      const ch = new Chart(canvas, this.configDe(k, true));
      await new Promise(r => setTimeout(r, 0));
      const url = ch.toBase64Image('image/png', 1);
      ch.destroy(); zona.removeChild(canvas);
      return { url, ancho, alto };
    },
    async descargarPng(k) {
      const png = await this.pngDe(k);
      if (!png) return;
      const a = document.createElement('a');
      a.href = png.url; a.download = `${k}.png`; a.click();
    },

    /* ---------- Excel ---------- */
    hojaDatos(wb, nombre, columnas, filas) {
      const ws = wb.addWorksheet(nombre.slice(0, 31), { views: [{ state: 'frozen', ySplit: 1 }] });
      ws.columns = columnas.map(c => {
        const largo = Math.max(c.t.length, ...filas.slice(0, 400).map(f => String(f[c.k] ?? '').length));
        return { header: c.t, key: c.k, width: Math.min(c.ancho || 50, Math.max(9, largo + 2)) };
      });
      for (const f of filas) {
        const fila = {};
        for (const c of columnas) {
          let v = f[c.k];
          if (c.f === 'bool') v = v === true ? 'Sí' : v === false ? 'No' : null;
          else if (['int', 'dec1', 'dec2'].includes(c.f)) v = num(v);
          else if ((v === null || v === undefined) && c.vacio) v = c.vacio;
          fila[c.k] = v;
        }
        ws.addRow(fila);
      }
      columnas.forEach((c, i) => {
        const col = ws.getColumn(i + 1);
        if (c.f === 'int') col.numFmt = '0';
        if (c.f === 'dec1') col.numFmt = '0.0';
        if (c.f === 'dec2') col.numFmt = '0.00';
        if (c.ancho) col.alignment = { wrapText: true, vertical: 'top' };
      });
      this.estiloCabecera(ws.getRow(1));
      ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columnas.length } };
      return ws;
    },
    estiloCabecera(fila) {
      fila.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      fila.alignment = { vertical: 'middle', wrapText: true };
      fila.eachCell(c => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1C5CAB' } }; });
    },
    nuevoLibro() {
      const wb = new ExcelJS.Workbook();
      wb.creator = 'Tablero ISO 27001 Guatemala'; wb.created = new Date();
      return wb;
    },
    hojaResumen(wb) {
      const ws = wb.addWorksheet('Resumen');
      ws.columns = [{ width: 28 }, { width: 70 }];
      ws.addRow(['Adopción ISO/IEC 27001 en empresas de Guatemala']).font = { bold: true, size: 14 };
      ws.addRow(['Exportado', new Date().toLocaleString('es-GT')]);
      ws.addRow(['Filtros aplicados', this.textoFiltros]);
      //ws.addRow(['Nota', 'Las filas con origen «simulado» son datos de prueba: no son respuestas de las empresas.']);
      ws.addRow([]);
      const cab = ws.addRow(['Indicador', 'Valor']); this.estiloCabecera(cab);
      this.kpis.forEach(k => ws.addRow([k.et, `${k.val}  (${k.det})`]));
      ws.getColumn(2).alignment = { wrapText: true };
    },
    async exportarExcel() {
      this.exportando = true; this.error = null;
      try {
        const wb = this.nuevoLibro();
        this.hojaResumen(wb);
        const wg = wb.addWorksheet('Gráficas', { views: [{ showGridLines: false }] });
        wg.getColumn(12).width = 34;
        for (let c = 13; c <= 15; c++) wg.getColumn(c).width = 18;
        let fila = 1;
        for (const g of GRAFICAS) {
          const d = this.datosGraficas[g.key];
          wg.getCell(fila, 1).value = g.titulo; wg.getCell(fila, 1).font = { bold: true, size: 13 };
          wg.getCell(fila + 1, 1).value = g.sub; wg.getCell(fila + 1, 1).font = { italic: true, color: { argb: 'FF52514E' } };
          const png = await this.pngDe(g.key);
          let filasImagen = 2;
          if (png) {
            const id = wb.addImage({ base64: png.url, extension: 'png' });
            wg.addImage(id, { tl: { col: 0, row: fila + 1 }, ext: { width: png.ancho, height: png.alto } });
            filasImagen = Math.ceil(png.alto / 20) + 1;
          } else {
            wg.getCell(fila + 2, 1).value = 'Sin datos para estos filtros';
          }
          const cab = wg.getRow(fila + 2);
          d.tabla.cab.forEach((t, i) => { cab.getCell(12 + i).value = t; });
          d.tabla.cab.forEach((t, i) => {
            const c = cab.getCell(12 + i);
            c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1C5CAB' } };
          });
          d.tabla.filas.forEach((f, j) => {
            const r = wg.getRow(fila + 3 + j);
            f.forEach((v, i) => { const c = r.getCell(12 + i); c.value = v; if (typeof v === 'number' && !Number.isInteger(v)) c.numFmt = '0.00'; });
          });
          fila += Math.max(filasImagen + 3, d.tabla.filas.length + 5);
        }
        this.hojaDatos(wb, 'Empresas', COLUMNAS.empresas, this.resumenF);
        this.hojaDatos(wb, 'Adopción ISO', COLUMNAS.iso, this.isoF);
        this.hojaDatos(wb, 'Impacto', COLUMNAS.impacto, this.impactoF);
        this.hojaDatos(wb, 'Incidentes', COLUMNAS.incidentes, this.fichaF);
        this.hojaDatos(wb, 'Tipos de incidente', COLUMNAS.tipos, this.tiposF);
        this.hojaPreguntas(wb, FORMULARIOS_UI);
        this.hojaDatos(wb, 'Preguntas y respuestas', COLUMNAS.detalle, this.detalleF);
        await this.guardarLibro(wb, 'ISO27001_Guatemala');
      } catch (e) {
        this.error = { titulo: 'No se pudo generar el Excel. ', detalle: String(e && e.message || e) };
      } finally {
        this.exportando = false;
      }
    },
    async exportarTabla(ev) {
      try {
        const wb = this.nuevoLibro();
        this.hojaDatos(wb, ev.nombre, ev.columnas, ev.filas);
        await this.guardarLibro(wb, ev.nombre.replace(/\s+/g, '_'));
      } catch (e) {
        this.error = { titulo: 'No se pudo exportar la tabla. ', detalle: String(e && e.message || e) };
      }
    },
    async guardarLibro(wb, base) {
      const buf = await wb.xlsx.writeBuffer();
      const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const h = new Date();
      const fecha = `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = `${base}_${fecha}.xlsx`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
  }
});
app.mount('#app');

