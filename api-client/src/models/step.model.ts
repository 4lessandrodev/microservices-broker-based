
interface Props {
    paymentId: string;
    paymentStatus: string;
    patientStatus: string;
    invoiceStatus: string;
}

export class Step {
    public static start(paymentId: string): Step {
        return new Step({
            paymentId,
            invoiceStatus: 'Pending',
            patientStatus: 'Pending',
            paymentStatus: 'Pending'
        })
    }

    public static updateStatus(key: keyof Props, status: string, step: Step): Step {
        return Object.assign({}, { ...step }, { [key]: status })
    }

    public readonly paymentId: string;
    public readonly paymentStatus: string;
    public readonly patientStatus: string;
    public readonly invoiceStatus: string;

    private constructor(props: Props){
        this.paymentId = props.paymentId;
        this.invoiceStatus = props.invoiceStatus;
        this.patientStatus = props.patientStatus;
        this.paymentStatus = props.paymentStatus;
    }
}

export default Step;