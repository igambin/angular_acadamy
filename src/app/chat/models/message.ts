export class Message {
  public text: string;
  public sender: string;
  public isAlert: boolean;
  public classTags: string;

  private alignmentRules: Map<string, string> = new Map([
    ['me', 'left'],
    ['Channel', 'center'],
    ['default', 'right']]
  );

  constructor(text: string, sender: string, isAlert: boolean = false) {
    this.text = text;
    this.sender = sender;
    this.isAlert = isAlert;
    this.classTags = this.evaluateClasses();
  }

  private evaluateClasses(): string {
    const classes: string[] = [];
    // check alignment
    if (this.alignmentRules.get(this.sender) === undefined) {
      this.sender = 'default';
    }
    classes.push(this.alignmentRules.get(this.sender));
    // check alertness
    classes.push(this.isAlert ? 'alert-info' : '');
    // return classTags
    return classes.filter(Boolean).join(' ');
  }
}
