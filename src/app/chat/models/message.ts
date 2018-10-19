export class Message {
  public text: string;
  public sender: string;
  public isAlert: string;
  public cardAlign: string;
  public textAlign: string;
  public time: string;

  private textAlignmentRules: Map<string, string> = new Map([
    ['me'     , 'text-left'],
    ['Channel', 'text-center'],
    ['default', 'text-right']]
  );

  private cardAlignmentRules: Map<string, string> = new Map([
    ['me'     , 'w-75 float-left'],
    ['Channel', 'w-100 center'],
    ['default', 'w-75 float-right']]
  );

  constructor(text: string, sender: string, isAlert: boolean = false) {
    this.text = text;
    this.sender = sender;
    this.isAlert = isAlert ? 'bg-primary text-white' : '';
    this.cardAlign = this.evaluateCardAlignment();
    this.textAlign = this.evaluateTextAlignment();
    this.time = new Date().toLocaleTimeString('de-DE');
  }

  private evaluateCardAlignment(): string {
    const classes: string[] = [];
    // check alignment
    if (this.cardAlignmentRules.get(this.sender) === undefined) {
      this.sender = 'default';
    }
    classes.push(this.cardAlignmentRules.get(this.sender));
    // return classTags
    return classes.filter(Boolean).join(' ');
  }

  private evaluateTextAlignment(): string {
    const classes: string[] = [];
    // check alignment
    if (this.textAlignmentRules.get(this.sender) === undefined) {
      this.sender = 'default';
    }
    classes.push(this.textAlignmentRules.get(this.sender));
    // return classTags
    return classes.filter(Boolean).join(' ');
  }
}
