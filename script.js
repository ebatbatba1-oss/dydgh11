document.addEventListener('DOMContentLoaded', () => {
    const designRadios = document.querySelectorAll('input[name="design"]');
    const bgImage = document.getElementById('card-bg');
    const cardWrap = document.getElementById('card-wrap');
    
    const detailLabel = document.getElementById('detail-label');
    const detailInput = document.getElementById('detail-input');

    const photoUpload = document.getElementById('photo-upload');
    const uploadedPhoto = document.getElementById('uploaded-photo');

    const nameInput = document.getElementById('name-input');
    const displayName = document.getElementById('display-name');
    const displayDetail = document.getElementById('display-detail');

    const downloadBtn = document.getElementById('download-btn');

    // 1. 디자인 선택 이벤트 (라디오 버튼)
    designRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'design1') {
                bgImage.src = 'design1.png'; // 그린 배경
                cardWrap.className = 'theme-design1';
                detailLabel.textContent = '체급 (복서)';
                detailInput.placeholder = '예: 라이트급';
            } else {
                bgImage.src = 'design2.png'; // 실버 배경
                cardWrap.className = 'theme-design2';
                detailLabel.textContent = '포지션 (페어)';
                detailInput.placeholder = '예: 미트잡이';
            }
        });
    });

    // 2. 사진 업로드 및 미리보기 이벤트
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedPhoto.src = event.target.result;
                uploadedPhoto.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. 텍스트 실시간 반영 이벤트
    nameInput.addEventListener('input', (e) => {
        displayName.textContent = e.target.value;
    });

    detailInput.addEventListener('input', (e) => {
        displayDetail.textContent = e.target.value;
    });

    // 4. 완성본 다운로드 이벤트
    downloadBtn.addEventListener('click', () => {
        // html2canvas 옵션: scale을 높여 고화질로 렌더링
        html2canvas(cardWrap, {
            scale: 3, 
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'BoxingGym_ID_Card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});