export class Message {
  public text: string;
  public sender: string;
  public isAlert: string;
  public cardAlign: string;
  public textAlign: string;
  public createdAt: Date;

  private alertFormat = 'bg-primary text-white' ;

  private textAlignmentRules: Map<string, string> = new Map([
    ['remote' , 'text-left'  ],
    ['Channel', 'text-center'],
    ['me'     , 'text-right' ]]
  );

  private cardAlignmentRules: Map<string, string> = new Map([
    ['me'     , 'w-75 ml-auto'         ],
    ['Channel', 'w-100 center'         ],
    ['remote' , 'w-75 mr-auto incoming']]
  );

  constructor(text: string, sender: string, isAlert: boolean = false) {
    this.text = text;
    if (text.startsWith('/c ')) {
      this.text = this.text.substring(3);
      this.sender = 'Channel';
      isAlert = true;
    } else {
      this.sender = sender;
    }
    this.isAlert = isAlert ? this.alertFormat : '' ;
    this.cardAlign = this.evaluateCardAlignment();
    this.textAlign = this.evaluateTextAlignment();
    this.createdAt = new Date();
  }

  private evaluateCardAlignment(): string {
    if (this.cardAlignmentRules.get(this.sender) === undefined) { this.sender = 'remote'; }
    return this.cardAlignmentRules.get(this.sender);
  }

  private evaluateTextAlignment(): string {
    if (this.textAlignmentRules.get(this.sender) === undefined) { this.sender = 'remote'; }
    return this.textAlignmentRules.get(this.sender);
  }
}
